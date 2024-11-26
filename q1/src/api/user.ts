import { type User, UserModel } from "../models/User";
import { ValidationError, NotFoundError } from "../errors";

interface GetUsersPayload {
  size: number;
  limit: number;
}

interface CreateUserPayload {
  name: string;
  email: string;
}

interface UpdateUserPayload {
  id: string;
  name?: string;
  email?: string;
}

interface ArchiveUserPayload {
  id: string;
}

/**
 * Returns a paginated list of all NON-ARCHIVED users using expected options in `GetUsersPayload`.
 * Results ***MUST*** be sorted in ascending order based on `name`.
 *
 * @throws {ValidationError} If the payload is invalid.
 */
export async function getUsers(
  payload: unknown,
): Promise<{ data: User[]; total: number }> {
  if (!payload || typeof payload !== 'object') {
    throw new ValidationError();
  }

  const { size, limit } = payload as GetUsersPayload;
  if (size < 0 || limit <= 0) {
    throw new ValidationError();
  }

  const paginate = size * limit;
  
  const data = await UserModel.find({ archivedAt: null }).sort({ name: 1 }).skip(paginate).limit(limit);
  const total = await UserModel.countDocuments({ archivedAt: null })

  return { data, total };
  }

/**
 * Creates a user with the expected properties of `CreateUserPayload`.
 *
 * @throws {ValidationError} If the payload is invalid.
 */
export async function createUser(payload: unknown): Promise<User> {
 if (!payload || typeof payload !== 'object') {
    throw new ValidationError();
  }

  const { name, email } = payload as CreateUserPayload;

  // Validate name and email
  if (typeof name !== 'string' || typeof email !== 'string') {
    throw new ValidationError();
  }

  const user = new UserModel({ name, email });
  await user.save();
  
  return user;
}

/**
 * Updates the user with id `payload.id` to have the properties in the `UpdateUserPayload`.
 *
 * If optional properties are not provided, those properties will not be updated.
 *
 * @throws {ValidationError} If the payload is invalid.
 * @throws {NotFoundError} If the requested is not found or is archived.
 */
export async function updateUser(payload: unknown): Promise<User> {
  if (!payload || typeof payload !== 'object') {
    throw new ValidationError();
  }

  const { id, name, email } = payload as UpdateUserPayload;
  if (typeof id !== 'string') {
    throw new ValidationError();
  }

  const user = await UserModel.findById(id);
  if (!user || user.archivedAt) {
    throw new NotFoundError('User not found');
  }

  if (name) {
    user.name = name;
  }

  if (email) {
    user.email = email;
  }

  await user.save();
  return user;
}

interface ArchiveUserPayload {
  id: string;
}
/**
 * Archives a NON-ARCHIVED user with id of `payload.id` in `ArchiveUserPayload`.
 *
 * User is archived by setting `archivedAt` to the current `Date`.
 *
 * @throws {ValidationError} If the payload is invalid.
 * @throws {NotFoundError} If the requested is not found or is already archived.
 */
export async function archiveUser(payload: unknown): Promise<User> {
  if (!payload || typeof payload !== 'object') {
    throw new ValidationError();
  }

  const { id } = payload as ArchiveUserPayload;

  if (typeof id !== 'string') {
    throw new ValidationError();
  }

  const user = await UserModel.findById(id);
  if (!user || user.archivedAt) {
    throw new NotFoundError('User not found.');
  }

  user.archivedAt = new Date();

  await user.save();
  return user;
}

