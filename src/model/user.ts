import mongoose from 'mongoose';
import moment from 'jalali-moment';

enum Role{ADMIN= 'ADMIN',USER= 'USER'}

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

const userSchema = new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		jobTitle: { type: String, required: true },
		// active: { type: Boolean, default: true },
		role: { type: String, default: 'user', required: true },
		// workspaceId: { type: mongoose.Types.ObjectId, ref: 'workspace', required: true },
		workspaceId: { type: String /*required: true*/ },
		createdAt: { type: Number, required: true, default: moment(new Date()).format('X') },
		updatedAt: Number,
		deletedAt: Number,
	},
	{
		versionKey: false,
	}
);

const User = mongoose.model<IUser>('User', userSchema);
export default User;
