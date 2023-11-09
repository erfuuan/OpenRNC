interface IWorkspace {
	name: string;
	description: string;
	token: string;
	createdAt: Date;
	ownerId: string;
	updatedAt: Date;
	deletedAt: Date;
}

export default IWorkspace