import mongoose from 'mongoose';
import User, { IUser } from '../User';

describe('User model', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/mydatabase');
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  it('Should throw validation errors', () => {
    const user = new User();

    expect(user.validate).toThrow();
  });

  it('Should save a user', async () => {
    expect.assertions(3);

    const user: IUser = new User({
      name: "mongoose",
      email: 'test@example.com'
    });
    const spy = jest.spyOn(user, 'save');
    user.save();

    expect(spy).toHaveBeenCalled();

    expect(user).toMatchObject({
      name: expect.any(String),
      email: expect.any(String)
    });

    expect(user.email).toBe('test@example.com');
  });
});