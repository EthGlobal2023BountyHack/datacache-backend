import User from '../../models/User';

const userController = {
  async index(req, res) {
    try {
      const user = await User.find();
      return res.status(200).json({
        status: 'success',
        data: user,
      });
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        message: error.message,
      });
    }
  },

  async show(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findOne(userId);
      return res.status(200).json({ status: 'success', data: user });
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        message: error.message,
      });
    }
  },

  async loggedUser(req, res) {
    try {
      const user: any = await User.findById(req.user._id);
      return res.status(200).json({ status: 'success', data: user });
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        message: error.message,
      });
    }
  },

  async create(req, res) {
    try {
      const { email, password, passwordConfirm } = req.body;
      const user: any = await User.create({
        email, password, passwordConfirm
      });
      await user.generateAuthToken();
      await user.save();
      return res.status(200).json({ status: 'success', message: 'User created', data: { token: user.token } });
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        message: error.message,
      });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      await User.findByIdAndUpdate(
        id,
        { $set: req.body },
        { upsert: false, new: true },
      );

      return res.status(200).json({ status: 'success', message: 'User updated' });
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        message: error.message,
      });
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await User.findByIdAndDelete(id);

      return res.status(200).json({ status: 'success', message: 'User deleted' });
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        message: error.message,
      });
    }
  },

};

export default userController;
