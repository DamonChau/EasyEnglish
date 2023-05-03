using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Azure.Core;
using EasyEnglishAPI.DAL;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace EasyEnglishAPI.Controllers
{
    public class FileUpload
    {
        public string? filename { get; set; }
    }
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
            string uploadFolder = @"\uploadFiles";
            
            try
            {
                var file = colForm.Files[0];

                if (file.Length > 0)
                {
                    string path = "";
                    if (_hostingEnvironment.EnvironmentName.ToLower().Contains("dev"))
                        path = Path.Combine(Directory.GetCurrentDirectory(), uploadFolder);
                    else
                        path = Path.Combine(_hostingEnvironment.ContentRootPath, uploadFolder);

                    filename = file.FileName.Replace(".plain", "").Replace(".msword", "").Replace(".vnd", "");

                    using (var fs = new FileStream(Path.Combine(path, filename), FileMode.Create))
                    {
                        await file.CopyToAsync(fs);
                    }
                }
                
                return Ok(new { success = "true" });
            }
            catch (Exception e)
            {
                return BadRequest(new { success = "false", time = DateTime.Now.ToString("yyyy-mm-dd HH:MM:SS"), data = new { messasges = new string[] { e.Message } } });
            }
        }

        [HttpPost]
        [Route("api/FilesUpload/download")]
        public async Task<IActionResult> Download([FromBody] FileUpload file)
        {
            string uploadFolder = @"\uploadFiles";

            if (file == null || file.filename == null)
                return Content("filename not present");
            try
            {
                string path = "";
                if (_hostingEnvironment.EnvironmentName.ToLower().Contains("dev"))
                    path = Path.Combine(Directory.GetCurrentDirectory(), uploadFolder);
                else
                    path = Path.Combine(_hostingEnvironment.ContentRootPath, uploadFolder);

                var memory = new MemoryStream();
                using (var stream = new FileStream(Path.Combine(path, file.filename), FileMode.Open))
                {
                    await stream.CopyToAsync(memory);
                }
                memory.Position = 0;

                string? contentType = "";
                new FileExtensionContentTypeProvider().TryGetContentType(file.filename, out contentType);

                return File(memory, contentType, Path.GetFileName(path));
            }
            catch (Exception e)
            {
                return BadRequest(new { success = "false", time = DateTime.Now.ToString("yyyy-mm-dd HH:MM:SS"), data = new { messasges = new string[] { e.Message } } });
            }   
          
        }
    }
}
