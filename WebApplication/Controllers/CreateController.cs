using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApplication.DataAccess.Interfaces;
using WebApplication.Dbo;
using MailKit.Net.Smtp;
using MimeKit;

namespace WebApplication.Controllers
{
    public class CreateController : Controller
    {
        private readonly ILogger<CreateController> _logger;
        private readonly IEventRepository _eventRepository;
        public CreateController(ILogger<CreateController> logger, IEventRepository eventRepository)
        {
            _logger = logger;
            _eventRepository = eventRepository;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Index(Event _event)
        {
            var eventHash = HashGenerator();
            _event.EventHash = eventHash;
            await _eventRepository.Insert(_event);
            SendEmail(true, _event);

            return RedirectToAction("Index", "Event", new { eventHash = eventHash });
        }

        private string HashGenerator()
        {
            StringBuilder builder = new StringBuilder();
            Enumerable
               .Range(65, 26)
                .Select(e => ((char)e).ToString())
                .Concat(Enumerable.Range(97, 26).Select(e => ((char)e).ToString()))
                .Concat(Enumerable.Range(0, 10).Select(e => e.ToString()))
                .OrderBy(e => Guid.NewGuid())
                .Take(10)
                .ToList().ForEach(e => builder.Append(e));
            return builder.ToString();
        }
        public void SendEmail(bool isCreator, Event _event)
        {
            var thankMessage = isCreator ? "Merci d'avoir utilisé KiPrendKoi pour planifier " : "Vous avez été invité à participer à ";
            var url = "https://kiprendkoi.azurewebsites.net/event/" + _event.EventHash;

            BodyBuilder bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = "<h1>" + thankMessage + _event.Name + "! </h1>" +
                "<a href=" + url + ">Pour accéder à l'évènement, veuillez cliquer sur ce lien <a/>";
            bodyBuilder.TextBody = "Merci d'avoir utilisé KiPrendKoi pour planifier vos évènements!";

            MimeMessage message = new MimeMessage();
            message.From.Add(new MailboxAddress("KiPrendKoi", "no-reply@kiprendkoi.com"));
            message.To.Add(new MailboxAddress("User", _event.Email));
            message.Subject = _event.Name;
            message.Body = bodyBuilder.ToMessageBody();

            SmtpClient client = new SmtpClient();
            client.Connect("smtp.gmail.com", 587, false);
            client.Authenticate("joseph.hgdev@gmail.com", "jyhpdxrulijozsri");

            client.Send(message);
            client.Disconnect(true);
            client.Dispose();
        }
    }
}
