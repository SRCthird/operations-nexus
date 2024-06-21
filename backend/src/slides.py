from datetime import datetime
import os
import shutil
from time import sleep
import win32com.client as win32
import pythoncom
import requests
from dotenv import load_dotenv


class Slides:
    """
    A class to manage PowerPoint slide files, convert them to PNG, and store them for use in the web app.
    """

    def __init__(
        self,
        locations: list = list(),
        public: str = "static",
        source: str = "pptx",
        output: str = "image"
    ):
        self.locations: list[str] = locations
        self.root = os.path.dirname(os.path.realpath(__file__))
        self.locationDict = {
            location: [] for location in self.locations}

        self.__public = public
        self.__source = source
        self.__output = output

    def getSource(self):
        """
        Get the name of the source directory relative to the public directory.

        :return: the source directory as a string
        :rtype: str
        """
        return self.__source

    def setSource(self, source: str):
        """
        Set the name of the source directory.

        :default: pptx
        """
        self.__source = source
        return self

    def getOutput(self):
        """
        Get the name of the output directory relative to the public directory.

        :return: the output directory as a string
        :rtype: str
        """
        return self.__output

    def setOutput(self, output: str):
        """
        Set the name of the output directory.

        :param str output: The name of the output directory
        :default: pptx
        """
        self.__output = output
        return self

    def getPublic(self):
        """
        Get the location of the the public folder relative to the slides file.

        :return: the public folder location
        :rtype: str
        """
        return self.__public

    def setPublic(self, location: str):
        """
        Set the location of the public folder relative to the slides.py file.
        :default: static
        """
        self.__public = location
        return self

    def initializeDict(self):
        """
        Initializes the dictionary with the files in the given locations

        :rtype: void
        """
        if len(self.locations) > 0:  # If locations are not empty
            for location in self.locations:
                self.locationDict[location] = self.getUpdate(location)

    def updateDict(self, location: str):
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

    def addLocation(self, location: str):
        """
        Manually add a location to the locations list.

        :param str location: Name of the subfolder under "src" and "static".
        """
        self.locations.append(location)

    def source(self, location: str):
        """
        Get the location of a specific sub folder in the "src" folder.

        :param str location: Name of the subfolder under "src".
        :return: location of subfolder.
        :rtype: str
        """
        return os.path.join(self.root, self.__public, self.__source, location)

    def static(self, location: str):
        """
        Get the location of a specific sub folder in the "static" folder.

        :param str location: Name of the subfolder under "static".
        :return: location of subfolder.
        :rtype: str
        """
        return os.path.join(self.root, self.__public, self.__output, location)

    def checkUpdate(self, previous, current):
        """
        Compairs the values of the previouse listed items in a folder and the current items.

        :param list previous: Name of every pptx file in the current locations "src" folder.
        :return: True of False.
        :rtype: boolean
        """
        return (previous == current)

    def getUpdate(self, location: str):
        """
        Return the list of PowerPoint files in the source location.

        :param str location: Name of the subfolder under "src".
        :return: List of PowerPoint file names.
        :rtype: list
        """
        path: str = self.source(location)
        try:
            result = [file for file in os.listdir(
                path) if file.endswith(".pptx")]
            return result
        except Exception as e:
            print("An error occurred:", e)
            os.mkdir(path)
        return []

    def convertToPNG(self, file: str, location: str):
        """
        Convert a PowerPoint file to a PNG file.

        :param str file: Location of the PowerPoint file.
        :param str location: Name of the output subfolder under "static".
        """
        powerpoint = win32.Dispatch(
            "Powerpoint.Application", pythoncom.CoInitialize())
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

    def refreshAll(self, location: str):
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

    def deleteOld(self, location: str):
        """
        Delete all png files in a specific "static" sub folder.

        :param str location: Name of the subfolder under "static".
        """
        path = os.path.join(self.root, self.__public, self.__output, location)
        try:
            shutil.rmtree(path)
            os.mkdir(path)
        except Exception as e:
            print(f'Failed to recreate folder {path}. Reason: {e}')

    def check(self, location: str):
        """
        Check if the contents of a specific "static" sub folder has changed.

        :param str location: Name of the subfolder under "static".
        :return: 1 if a change is detected, 0 if no change is detected
        :rtype: int
        """
        previousContents = self.locationDict.get(location)
        currentContents = self.getUpdate(location)
        if not self.checkUpdate(previousContents, currentContents):
            self.deleteOld(location)
            self.refreshAll(location)
            print(f'{location} contents have changed.')
            self.updateDict(location)
            return 1
        return 0

    def run(self, callStop=lambda: True, onChange=lambda: None):
        """
        Run the Slides class on loop until CTL+C is pressed.

        :param boolFunc: A function returning a boolean whether to continue the loop. 
                         Defaults to a function returning True.
        """
        try:
            while callStop():
                for location in self.locations:
                    if self.check(location) == 1:
                        onChange(location)
                sleep(10)
        except KeyboardInterrupt:
            pass
        print("Exiting...")


if __name__ == '__main__':
    load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))
    host = os.getenv('HOST') or ""
    if host == "":
        raise EnvironmentError('Missing the HOST environment variable')

    def stop():
        try:
            requests.get(host)
            return True
        except Exception as e:
            print(e)
        return False

    def update_version(location: str):
        url = f"{host}/api/departments/{location}"
        response = requests.get(url)
        if response.status_code == 200:
            current_version = response.json().get('pptxVersion', 0)
            new_version = current_version + 1
            patch_data = {"pptxVersion": new_version}
            patch_response = requests.patch(url, json=patch_data)
            if patch_response.status_code == 200:
                print("Successfully updated version to:", new_version)
            else:
                print("Failed to update version:",
                      patch_response.status_code, patch_response.text)
        else:
            print("Failed to retrieve current version:",
                  response.status_code, response.text)

    def fetch_departments(url):
        try:
            response = requests.get(url)
            response.raise_for_status()

            return [department.get("department") for department in response.json()]
        except requests.exceptions.RequestException as e:
            print(f"An error occurred: {e}")
            return []

    slides = Slides(
        fetch_departments(f"{host}/api/departments"),
        public="../dist/public",
        source="pptx",
        output="image"
    )
    slides.run(
        callStop=stop,
        onChange=update_version
    )
