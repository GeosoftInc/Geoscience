import unittest
import os

import geosoft.gxpy.gx as gx
import geosoft.gxpy.system as gsys
import tilt_derivative as gxtd

class Test(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.gxc = gx.GXpy()
        cls.folder, files = gsys.unzip('test_data.zip', folder=cls.gxc.temp_folder())
        cls.grid_file = os.path.join(cls.folder, 'bhn_tmi_250m.grd')

    def start(self):
        print(self.id().split('.')[-1])

    def test_derivative(self):
        self.start()

        with gxtd.GridUtility.open(self.grid_file) as grd:
            dzg = grd.vertical_derivative()
            pass
