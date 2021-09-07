const AddedThread = require('../AddedThread');

describe('a AddedThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      user:'*'
    };

    // Action and Assert
    expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      body: 'dicoding',
      title: {},
    };

    // Action and Assert
    expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should create newThread object correctly', () => {
    // Arrange
    const payload = {
      title: 'Dicoding Indonesia',
      body: 'dicoding'  
    };

    // Action
    const addedThread = new AddedThread(payload);

    // Assert
    expect(addedThread.body).toEqual(payload.body);
    expect(addedThread.title).toEqual(payload.title);
  });
});
