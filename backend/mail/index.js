const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'siteinformingservice@gmail.com',
        pass: 'xftywqtydjouxmtl',
    },
})

const emails = ['reklama@anosoff.com', 'reklamamd@anosoff.com']

function createHtml(data) {
    let html = ''

    if (data.name) {
        html += wrapField(
            {
                name: 'Имя',
                value: data.name,
            },
            true,
        )
    }

    if (data.phone) {
        html += wrapField(
            {
                name: 'Телефон',
                value: data.phone,
            },
            true,
        )
    }

    if (data.email) {
        html += wrapField(
            {
                name: 'E-mail',
                value: data.email,
            },
            true,
        )
    }

    if (data.program) {
        html += wrapField(
            {
                name: 'Программа обучения',
                value: data.program,
            },
            true,
        )
    }

    if (data.age) {
        html += wrapField(
            {
                name: 'Возраст',
                value: data.age,
            },
            true,
        )
    }

    if (data.text) {
        html += wrapField({
            name: 'Текст',
            value: data.text,
        })
    }

    if (data.link) {
        html += wrapField(
            {
                name: 'Ссылка',
                value: data.link,
            },
            true,
        )
    }

    return html
}

function wrapField(field, bold) {
    // if (bold) {
    //     return `<p><b>${field.name}:</b> ${field.value}</p>\n`
    // }

    return `${field.name}: ${field.value}; `
}

function send(req, res) {
    const html = createHtml(req.body)

    const mailOptions = {
        from: 'Upkid <siteinformingservice@gmail.com>',
        to: '',
        subject: req.body.title || 'Заявка',
        html,
    }

    const currentEmail = req.body.link.includes('/cis') ? emails[0] : emails[1]

    mailOptions.to = currentEmail
    transporter.sendMail(mailOptions, err => {
        if (err) console.log(err)
    })

    res.status(200).end(JSON.stringify({ status: 'ok' }))
}

module.exports.send = send
