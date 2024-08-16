const { BadRequestError } = require('../core/error.response');
const Cart = require('../db/models/cart');
const User = require('../db/models/User');
const Room = require('../db/models/Room');


class CartServices {

    static getCartItems = async({user_id}) => {
        try {
            const userData = await Cart.findAll({ where: { user_id: user_id } });
            const cartData = [];
            for (const item of userData) {
                const roomData = await Room.findOne({ where: { room_id: item.room_id } });
                cartData.push(roomData);
            }
            return cartData;
        } catch (error) {
            console.error("Error to get cart data: ", error );
            throw error;
        }
    }

    static viewCart = async({user_id}) => {
        try {
            const userData = await Cart.findAll({ where: { user_id: user_id } });
            const cartData = [];
            for (const item of userData) {
                const roomData = await Room.findOne({ where: { room_id: item.room_id } });
                cartData.push(roomData);
            }
            return cartData;
        } catch (error) {
            console.error("Error fetching cart data:", error);
            throw error;
        }
    }

    static removeCart = async({user_id, room_id}) => {
        try {
            const userData = await Cart.destroy({ 
                where: { 
                    user_id: user_id,
                    room_id: room_id
                } 
            });
            return userData;
        } catch (error) {
            console.error("Error fetching cart data:", error);
            throw error;
        }
    }

    static addToCart = async ({user_id, room_id, quantity}) => {
        const checkUser = await User.findOne({where: {id: user_id}});
        if(!checkUser) {
            throw new BadRequestError("Error: User doesn't exist in database!");
        }
        const checkRoom = await Room.findOne({where: {room_id: room_id}});
        if(!checkRoom) {
            throw new BadRequestError("Error: Room doesn't exist in database!");
        }
        const addCart = await Cart.create({
            user_id: user_id,
            room_id: room_id,
            quantity: quantity
        });
        return addCart;
    }

}


module.exports = CartServices;