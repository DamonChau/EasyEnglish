using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using EasyEnglishAPI.DAL;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EasyEnglishAPI.Controllers
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
            
            try
            {
                var file = colForm.Files[0];

                if (file.Length > 0)
                {
                    if (_hostingEnvironment.EnvironmentName.ToLower().Contains("dev"))
                        uploadFolder = @"\uploadFiles";
                    else
                        uploadFolder = @"\uploadFiles";

                    string path = Path.Combine(_hostingEnvironment.ContentRootPath, uploadFolder);
                    filename = file.FileName.Replace(".plain", "").Replace(".msword", "").Replace(".vnd", "");

                    using (var fs = new FileStream(Path.Combine(path, filename), FileMode.Create))
                    {
                        await file.CopyToAsync(fs);
                    }
                }
                
                return Ok(new { success = "true", data = new { link = requestUrl + "/uploadFiles/" + filename } });
            }
            catch (Exception e)
            {
                return BadRequest(new { success = "false", time = DateTime.Now.ToString("yyyy-mm-dd HH:MM:SS"), data = new { messasges = new string[] { e.Message } } });
            }
        }
    }
}
