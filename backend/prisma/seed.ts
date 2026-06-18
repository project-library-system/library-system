import { PrismaClient, UserRole, ExemplaryStatus } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is not defined in environment');
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting database seeding...');

  // 1. Clean existing records in reverse order of dependencies
  console.log('Cleaning existing database records...');
  await prisma.loan.deleteMany();
  await prisma.exemplar.deleteMany();
  await prisma.book.deleteMany();
  await prisma.user.deleteMany();

  // 2. Hash passwords for users
  const userPasswordHash = await bcrypt.hash('user1234', 10);
  const adminPasswordHash = await bcrypt.hash('admin1234', 10);

  // 3. Create Users
  console.log('Creating demo users...');
  const userDemo = await prisma.user.create({
    data: {
      name: 'User Demo',
      email: 'user@biblio.com',
      password_hash: userPasswordHash,
      role: UserRole.USER,
    },
  });

  const adminDemo = await prisma.user.create({
    data: {
      name: 'Admin Demo',
      email: 'admin@biblio.com',
      password_hash: adminPasswordHash,
      role: UserRole.ADMIN,
    },
  });

  console.log(`Demo users created:`);
  console.log(`- User: ${userDemo.email} (${userDemo.role})`);
  console.log(`- Admin: ${adminDemo.email} (${adminDemo.role})`);

  // 4. Books and Exemplars data
  console.log('Creating books and exemplars...');
  const booksData = [
    {
      isbn: '9780451524935',
      name: '1984',
      author: 'George Orwell',
      publisher: 'Signet Classic',
      genre: 'Distopia',
      year: 1950,
      image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400',
    },
    {
      isbn: '9780061120084',
      name: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      publisher: 'Harper Perennial',
      genre: 'Ficção',
      year: 1960,
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400',
    },
    {
      isbn: '9780743273565',
      name: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      publisher: 'Scribner',
      genre: 'Clássico',
      year: 1925,
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=400',
    },
    {
      isbn: '9780345339683',
      name: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      publisher: 'Ballantine Books',
      genre: 'Fantasia',
      year: 1937,
      image: 'https://images.unsplash.com/photo-1629992101753-56d196c8add2?q=80&w=400',
    },
    {
      isbn: '9781451673319',
      name: 'Fahrenheit 451',
      author: 'Ray Bradbury',
      publisher: 'Simon & Schuster',
      genre: 'Distopia',
      year: 1953,
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400',
    },
    {
      isbn: '9780141439518',
      name: 'Pride and Prejudice',
      author: 'Jane Austen',
      publisher: 'Penguin Classics',
      genre: 'Romance',
      year: 1813,
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400',
    },
    {
      isbn: '9780316769488',
      name: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      publisher: 'Little, Brown',
      genre: 'Ficção',
      year: 1951,
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=400',
    },
    {
      isbn: '9780060850524',
      name: 'Brave New World',
      author: 'Aldous Huxley',
      publisher: 'Harper Perennial',
      genre: 'Distopia',
      year: 1932,
      image: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=400',
    },
    {
      isbn: '9780618640157',
      name: 'The Lord of the Rings',
      author: 'J.R.R. Tolkien',
      publisher: 'Houghton Mifflin',
      genre: 'Fantasia',
      year: 1954,
      image: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=400',
    },
    {
      isbn: '9780062315007',
      name: 'The Alchemist',
      author: 'Paulo Coelho',
      publisher: 'HarperOne',
      genre: 'Aventura',
      year: 1988,
      image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=400',
    },
  ];

  for (const bookInfo of booksData) {
    const createdBook = await prisma.book.create({
      data: bookInfo,
    });

    // Create 2 exemplars for each book to make them loanable
    await prisma.exemplar.create({
      data: {
        book_id: createdBook.id,
        code: `EXE-${bookInfo.isbn}-1`,
        status: ExemplaryStatus.AVAILABLE,
      },
    });

    await prisma.exemplar.create({
      data: {
        book_id: createdBook.id,
        code: `EXE-${bookInfo.isbn}-2`,
        status: ExemplaryStatus.AVAILABLE,
      },
    });
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
