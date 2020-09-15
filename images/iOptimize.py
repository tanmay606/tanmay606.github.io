"""
    Written By : TANMAY UPADHYAY
    Email : kevinthemetnik@gmail.com
    Facebook : /tanmayupadhyay91

    This script will help you to get optimized images (ie. lower size with nearly same quality images) which will be very suitable for you
    If you want to a high quality image for your website background.

    This script will utilize https://tinyjpg.com/ API to perform it's operations.

    Usage: ImageCompressor(url-of-orignal-image-file);

    For Multiple Images You can build a program with loop.
    
    (Eg.)

    imageslist = ["IMG1","IMG2","IMG3","IMG4"];

    for each_image in imageslist:
        ImageCompressor(each_image);  #! it will help you to process each image seperately in one script.



 <> Output file will be saved in current directory.


"""

from selenium.webdriver import Chrome
from selenium.webdriver.support import expected_conditions as EC;
from selenium.webdriver.common.by import By;
from selenium.webdriver.support.ui import WebDriverWait;
from selenium.webdriver.chrome.options import Options
from os import path, getcwd, listdir
import requests #! requests library is used to download the image from website.
import selenium


class ImageCompressor():

    def __init__(self,inputfile):

        """
            code reponsible for setting up the selenium and basic program settings.
        """
        self.locationtosave = r"C:\Users\HP\Desktop"; #! here the output image will be saved.
        self.inputfile = inputfile;
        if not self.VerifyImage(self.inputfile):
            #! if image file is not supported.
            print("Error : Image Processing Error (Possible Causes): \n1.Not In Png Or Jpeg Format\n2.Image File Not Found.");
        else:
            self.chrome_driver = r"H://chromedriver.exe";
            self.website = "https://tinyjpg.com/"; #official site for image compression.
            
            self.browser_settings = Options();
            #self.browser_settings.add_argument("--headless"); #to make hidden processing.

            self.browser_settings.binary_location = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
             
            self.chrome_browser = Chrome(self.chrome_driver,options=self.browser_settings); #to execute the chrome automated version.
            self.chrome_browser.get(self.website) #for navigating to website.
            self.Processing(self.inputfile) #! to invoke processing method for uploading image.
            self.RetrOutput();
        pass


    def VerifyImage(self,ImgFile):

        self.ImgFile = ImgFile;
        if ".png" not in self.ImgFile and ".jpg" not in self.ImgFile:
            #!The image which we want to compress is in invalid format. (only jph and png format supported.)
            return False;
        else:
            if path.isfile(self.ImgFile):
                #! if file format is correct and file also exists.
                return True;
            else:
                return False;

    def Processing(self,filetoupload):
        """
            code responsible for image upload and processing on website.
        """

        print("[wait] uploading image . . . ");
        self.filetoupload = filetoupload;
        self.ImageFound = False; #True if image is processed and ready to download.
        self.upload_btn = self.chrome_browser.find_element_by_xpath(r"/html/body/header/section/section/input");
        self.upload_btn.send_keys(self.filetoupload) #upload file on website.

        
        self.download_btn = WebDriverWait(self.chrome_browser,20).until(EC.presence_of_element_located((By.XPATH,r"/html/body/header/section/div/section/ul/li/div[3]/a")))
        self.direct_url = self.download_btn.get_attribute("href");
        print("[success] Image uploaded successfully.")
        pass

    def RetrOutput(self):
        """
            code responsible for downloading the output compressed file from .
        """

        self.outputFilename = self.direct_url.split("/")[-1];
        self.imgData = requests.get(self.direct_url);
        self.imgFile = self.imgData.content;
        try:
            with open(self.outputFilename,"wb") as imgF:
                imgF.write(self.imgFile);
            print("[success] Compressed Image %s File Saved (%s) Successfully."%(self.outputFilename, getcwd()));
        except OSError:
            print("Error : Unable to save file at (%s)"%getcwd());

        pass
    





curLocation = getcwd();
for eachImage in listdir(curLocation):
	if(".py" not in eachImage):
		ImageCompressor(curLocation + "\\" + eachImage)