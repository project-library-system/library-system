export class LoanDomainException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'LoanDomainException';
    }
}

export class ExemplaryNotAvailableException extends LoanDomainException {
    constructor(exemplaryId: string) {
        super(`Exemplary with ID ${exemplaryId} is not available for loan.`);
        this.name = 'ExemplaryNotAvailableException';
    }
}

export class UserNotFoundException extends LoanDomainException {
    constructor(userId: string) {
        super(`User with ID ${userId} not found.`);
        this.name = 'UserNotFoundException';
    }
}

export class InvalidLoanDateException extends LoanDomainException {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidLoanDateException';
    }
}
