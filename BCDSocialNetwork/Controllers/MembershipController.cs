using BCDSocialNetwork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Security;
using Umbraco.Web.WebApi;

namespace BCDSocialNetwork.Controllers
{
    public class MembershipController : UmbracoApiController 
    {
        [System.Web.Http.HttpPost]
        public object Login([FromBody] LoginModel loginData)
        {
            if (Membership.ValidateUser(loginData.Username, loginData.Password))
            {
                FormsAuthentication.SetAuthCookie(loginData.Username, false);
                return Json(new { success = true });
            }
            else
            {
                return Json(new { success = false, errorMessage = "Invalid username or password" });
            }
        }
    }
}