from datetime import datetime
import os
import shutil
from time import sleep
import win32com.client as win32
import pythoncom
import requests

class Slides:
    """
    A class to manage PowerPoint slide files, convert them to PNG, and store them for use in the web app.
    """

    # Constructor
    def __init__(self):
        self.locations = []
        self.root = os.path.dirname(os.path.realpath(__file__))
        self.locationDict = {}

    # Constructor with locations
    def __init__(self, locations):
        self.locations = locations
        self.root = os.path.dirname(os.path.realpath(__file__))
        self.locationDict = {location: "" for location in self.locations}

    def initializeDict(self):
        if len(self.locations) > 0: # If locations are not empty
            for location in self.locations:
                self.locationDict[location] = self.getUpdate(location)
    
    def updateDict(self, location):
        """
        Update the location dictionary.
        
        :param str location: Name of the subfolder under "src" and "static".
        """
        self.locationDict[location] = self.getUpdate(location)

    def getLocationDict(self):
        """
        Get the location dictionary.
        
        :return: location dictionary.
        :rtype: dict
        """
        return self.locationDict
    
    def getLocations(self):
        """
        Get the locations of all specific sub folder in the "src" folder.
        
        :return: names of locations.
        :rtype: list
        """
        return self.locations
    
    def setLocations(self, locations):
        """
        Manually add all locations to the locations list.
        
        :param list locations: Name of all the subfolders under "src" and "static".
        """
        self.locations = locations

    def addLocation(self, location):
        """
        Manually add a location to the locations list.
        
        :param str location: Name of the subfolder under "src" and "static".
        """
        self.locations.append(location)

    def source(self, location):
        """
        Get the location of a specific sub folder in the "src" folder.
        
        :param str location: Name of the subfolder under "src".
        :return: location of subfolder.
        :rtype: str
        """
        return os.path.join(self.root, f"src\\{location}")
    
    def static(self, location):
        """
        Get the location of a specific sub folder in the "static" folder.
        
        :param str location: Name of the subfolder under "static".
        :return: location of subfolder.
        :rtype: str
        """
        return os.path.join(self.root, f"static\\{location}")

    def checkUpdate(self, previous, current):
        """
        Compairs the values of the previouse listed items in a folder and the current items.
        
        :param list previous: Name of every pptx file in the current locations "src" folder.
        :return: True of False.
        :rtype: boolean
        """
        return (previous == current)

    def getUpdate(self, location):
        """
        Return the list of PowerPoint files in the source location.
        
        :param str location: Name of the subfolder under "src".
        :return: List of PowerPoint file names.
        :rtype: list
        """
        path = self.source(location)
        return [file for file in os.listdir(path) if file.endswith(".pptx")]
    
    def convertToPNG(self, file, location):
        """
        Convert a PowerPoint file to a PNG file.
        
        :param str file: Location of the PowerPoint file.
        :param str location: Name of the output subfolder under "static".
        """
        powerpoint = win32.Dispatch("Powerpoint.Application",pythoncom.CoInitialize())
        powerpoint.Visible = True
        presentation = powerpoint.Presentations.Open(file)
        numSlides = presentation.Slides.Count
        path = self.static(location)
        os.makedirs(path, exist_ok=True)
        for slideNum in range(1, numSlides + 1):
            slide = presentation.Slides(slideNum)
            timestamp = datetime.now().strftime("%Y%m%d%H%M%S%f")
            imagePath = os.path.join(path, f"slide_{timestamp}.png")
            slide.Export(imagePath, "PNG")
        presentation.Close()
        powerpoint.Quit()

    def refreshAll(self, location):
        """
        Refresh all png files in a specific "static" sub folder, by calling the convertToPNG method.
        
        :param str location: Name of the subfolder under "static".
        """
        source = self.source(location)
        files = os.listdir(source)
        fileList = [file for file in files if file.endswith(".pptx")]
        if not fileList:
            print("No PowerPoints found.")
        for file in fileList:
            print(f"[{datetime.now()}] Exporting \'{file}\'")
            file = os.path.join(source, file)
            self.convertToPNG(file, location)
        print(f"[{datetime.now()}] Files successfuly exported")

    def deleteOld(self, location):
        """
        Delete all png files in a specific "static" sub folder.
        
        :param str location: Name of the subfolder under "static".
        """
        path = os.path.join(self.root, f"static\\{location}")
        try:
            shutil.rmtree(path)
            os.mkdir(path)
        except Exception as e:
            print(f'Failed to recreate folder {path}. Reason: {e}')

    def check(self, location):
        """
        Check if the contents of a specific "static" sub folder has changed.
        
        :param str location: Name of the subfolder under "static".
        """
        previousContents = self.locationDict.get(location)
        currentContents = self.getUpdate(location)
        if not self.checkUpdate(previousContents, currentContents):
            self.deleteOld(location)
            self.refreshAll(location)
            print(f'{location} contents have changed.')
            self.updateDict(location)
    
    def run(self, boolFunc=lambda: True):
        """
        Run the Slides class on loop until CTL+C is pressed.
        
        :param should_continue: A function returning a boolean whether to continue the loop. 
                                Defaults to a function returning True.
        """
        try:
            while boolFunc():
                for location in self.locations:
                    self.check(location)
                sleep(10)
        except KeyboardInterrupt:
            pass
        print("Exiting...")

if __name__ == '__main__':
    def stop():
        try:
            r = requests.get('http://localhost:5000')
            return True
        except Exception as e:
            print(e)
        return False
    
    slides = Slides(['main', 'ssc'])
    slides.run(stop)