using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using System.Configuration;
using System.Data.Entity;
using System.Threading.Tasks;
using System.Web;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Net.Http;

namespace DiplomskiDezurstvo.Models
{
    public class EmailService : IIdentityMessageService
    {
        public async Task SendAsync(IdentityMessage message)
        {
            // Credentials:
            SmtpClient client = new SmtpClient();
            client.Host = "mail.micicdizajn.com";
            client.Credentials = new System.Net.NetworkCredential("info@micicdizajn.com", "062507483");
            client.Port = 25;
            client.EnableSsl = false;
            MailAddress from = new MailAddress("info@micicdizajn.com");
            MailAddress to = new MailAddress(message.Destination);
            MailMessage mail = new MailMessage(from, to);

            mail.Subject = message.Subject;
            mail.Body = message.Body;

            // Send:
            await client.SendMailAsync(mail);
        }

        public async Task SendEmail(string email, string subject, string body, string emailFrom)
        {
            // Credentials:
            SmtpClient client = new SmtpClient();
            client.Host = "mail.micicdizajn.com";
            client.Credentials = new System.Net.NetworkCredential("info@micicdizajn.com", "062507483");
            client.Port = 25;
            client.EnableSsl = false;
            MailAddress from = new MailAddress("info@micicdizajn.com");
            if (emailFrom != null)
            {
                from = new MailAddress(emailFrom);
            }
            else
            {
                from = new MailAddress("info@micicdizajn.com");
            }
            
            MailAddress to = new MailAddress(email);
            MailMessage mail = new MailMessage(from, to);

            mail.Subject = subject;
            mail.Body = body;

            mail.IsBodyHtml = true;

            // Send:
            await client.SendMailAsync(mail);
        }
    }
}