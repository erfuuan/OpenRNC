interface IUser {
	email: string;
	password: string;
	jobTitle: string;
	role :string;
	workspaceId: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;
}

export default IUser