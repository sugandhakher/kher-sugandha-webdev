module.exports = function (app) {


    var helper = require('sendgrid').mail;
    var sg = require('sendgrid')("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");

    app.post("/api/mail", sendMail);

    function sendMail(request, res) {
        var email = request.body;
        from_email = new helper.Email(email.fromMail)
        to_email = new helper.Email("aeshu08@gmail.com")
        subject = "Message from BookMyEvent"
        content = new helper.Content("text/plain", email.message)
        mail = new helper.Mail(from_email, subject, to_email, content)

        var requestBody = mail.toJSON()
        var request = sg.emptyRequest()
        request.method = 'POST'
        request.path = '/v3/mail/send'
        request.body = requestBody
        sg.API(request, function (response) {
            res.sendStatus(200);
        }, function (error) {
            res.statusCode(404).send(error);
        })
    }
};