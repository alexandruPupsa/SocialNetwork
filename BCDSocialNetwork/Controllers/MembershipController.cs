using BCDSocialNetwork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Security;
using Umbraco.Core.Models;
using Umbraco.Web.WebApi;

namespace BCDSocialNetwork.Controllers
{
    public class MembershipController : UmbracoApiController 
    {
        [System.Web.Http.HttpPost]
        public object Login([FromBody] LoginModel loginData)
        {
            bool success = false;
            string errorMessage = "";

            if (Membership.ValidateUser(loginData.Username, loginData.Password))
            {
                FormsAuthentication.SetAuthCookie(loginData.Username, false);
                success = true;
            }
            else
            {
                success = false;
                errorMessage = "Invalid username or password";
            }

            return Json(new { Success = success, ErrorMessage = errorMessage });
        }

        [System.Web.Http.HttpPost]
        public object Register([FromBody] LoginModel registerData)
        {
            bool success = false;
            string errorMessage = "";

            if (!MemberExists(registerData.Username))
            {
                IMember newMember = ApplicationContext.Services.MemberService.CreateMember(registerData.Username, registerData.Username, registerData.Username, "Member");

                try
                {
                    ApplicationContext.Services.MemberService.Save(newMember);
                    ApplicationContext.Services.MemberService.SavePassword(newMember, registerData.Password);
                    Members.Login(registerData.Username, registerData.Password);
                    success = true;
                }
                catch (Exception ex)
                {
                    errorMessage = ex.Message;
                    success = false;
                }
            }

            return Json(new { Success = success, ErrorMessage = errorMessage });
        }

        [System.Web.Http.HttpGet]
        public object Logout()
        {
            FormsAuthentication.SignOut();
            return Json(new { Success = true });
        }

        private bool MemberExists(string username)
        {
            return (ApplicationContext.Services.MemberService.GetByUsername(username) != null);
        }

    }
}