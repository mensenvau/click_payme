module.exports =  BilingErrors = {
    TransactionNotFound: function() {
        return {
            code : -31003,
            message : 'Транзакция не найденна',
            data : { error: 2, error_note: "Not" }
        }
    },

    UnexpectedTransactionState: function() {
        return {
            code : -31008,
            message : {
                'ru': 'Статус транзакции не позволяет выполнить операцию',
                'uz': 'Статус транзакции не позволяет выполнить операцию',
                'en': 'Статус транзакции не позволяет выполнить операцию'
            },
            data : null
        }
    },

    IncorrectAmount: function() {
        return {
            code : -31001,
            message : {
                'ru' : 'Неверная сумма заказа',
                'en' : 'Неверная сумма заказа',
                'uz' : 'Неверная сумма заказа'
            },
            data : null
        }
    },

    OrderNotFound: function() {
        return {
            code : -31050,
            message : {
                'ru' : 'Заказ не найден',
                'uz' : 'Заказ не найден',
                'en' : 'Заказ не найден'
            },
            data : 'order'
        }
    },

    OrderAvailable: function() {
        return {
            code : -31051,
            message : {
                'ru': 'Не возможно выполнить операцию. Заказ ожидает оплаты или оплачен.',
                'uz': 'Не возможно выполнить операцию. Заказ ожидает оплаты или оплачен.',
                'en': 'Не возможно выполнить операцию. Заказ ожидает оплаты или оплачен.'
            },
            data : 'order'
        }
    },

    OrderNotСanceled: function() {
        return {
            code : -31007,
            message : {
                'ru': 'Заказ полность выполнен и не подлежит отмене.',
                'uz': 'Заказ полность выполнен и не подлежит отмене.',
                'en': 'Заказ полность выполнен и не подлежит отмене.'
            },
            data : null
        }
    }
};