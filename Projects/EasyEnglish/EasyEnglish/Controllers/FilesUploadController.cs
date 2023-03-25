using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using EasyEnglish.DAL;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EasyEnglish.Controllers
{
    public class FilesUploadController : Controller
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        public FilesUploadController(IWebHostEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpPost]
        [Route("api/FilesUpload/upload")]
        public async Task<IActionResult> Upload(IFormCollection colForm)
        {
            string requestUrl = Request.Scheme + "://" + Request.Host + Request.PathBase;
            string filename = "";
            string uploadFolder = "";
            string tmp = @"https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_square.jpg";
            try
            {
                var file = colForm.Files[0];

                if (file.Length > 0)
                {
                    if (_hostingEnvironment.EnvironmentName.ToLower().Contains("dev"))
                        uploadFolder = @"ClientApp\public\uploadFiles";
                    else
                        uploadFolder = @"ClientApp\build\uploadFiles";

                    string path = Path.Combine(_hostingEnvironment.ContentRootPath, uploadFolder);
                    filename = file.FileName.Replace(".plain", "").Replace(".msword", "").Replace(".vnd", "");

                    using (var fs = new FileStream(Path.Combine(path, filename), FileMode.Create))
                    {
                        await file.CopyToAsync(fs);
                    }
                }
                //return Ok(new { success = "true", data = new { link = tmp } });
                return Ok(new { success = "true", data = new { link = requestUrl + "/uploadFiles/" + filename } });
            }
            catch (Exception e)
            {
                return BadRequest(new { success = "false", time = DateTime.Now.ToString("yyyy-mm-dd HH:MM:SS"), data = new { messasges = new string[] { e.Message } } });
            }
        }
    }
}
