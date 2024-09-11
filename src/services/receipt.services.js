const Receipt = require('../db/models/Receipt');
const crypto = require('crypto');

class ReceiptServives {
    static async generateReceipt(session) {
        const StripeAPI= session;
        try {
            const user_name = StripeAPI.session.customer_details.name;
            const user_email = StripeAPI.session.customer_details.email;
            const payment_method_type = StripeAPI.session.payment_method_types[0];
            const card_brand = StripeAPI.session.payment_intent.payment_method.card.brand;
            const card_last4 = StripeAPI.session.payment_intent.payment_method.card.last4;
            const amount_total = StripeAPI.session.amount_total;
            const currency = StripeAPI.session.currency;
            const payment_status = StripeAPI.session.payment_status;

            const hashedReceiptId = crypto.createHash('sha256').update(StripeAPI.session.id).digest('hex');
            const receipt_id = `receipt_${hashedReceiptId}`;

            const now = new Date();
            const receipt = await Receipt.create({
                receipt_id: receipt_id,
                user_name: user_name,
                user_email: user_email,
                payment_method_type: payment_method_type,
                card_brand: card_brand,
                card_last4: card_last4,
                amount_total: amount_total,
                currency: currency,
                payment_status: payment_status,
                receipt_date: now
            });
            return receipt;
        } catch (error) {
            console.error('Error generating receipt::', error);
            throw new Error('Receipt generation failed');
        }
    }
}

module.exports = ReceiptServives;