import express from 'express';
import User from '../models/User';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
    console.error(error);
    res.status(400).send({ message: 'Error creating user', error });
    }
} );  

router.get('/', async (req, res) => {
    try {
      const users = await User.find()
      res.status(200).send(users)
    } catch (error) {
      res.status(500).send(error)
    }
})

router.post('/filterByDui', async (req, res) => {
    const { dui } = req.body;
    try {
        const user = await User.findOne({"dui": dui });
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

export default router;