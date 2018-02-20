# -*- coding: utf-8 -*-
"""
Created on Thu Feb 27 16:51:26 2014

@author: ian
"""

import time
import numpy as np
import random
from enum import Enum

import geosoft.gxapi as gxapi
import geosoft.gxpy.gx as gxp
import geosoft.gxpy.utility as gxu
import geosoft.gxpy.grid as gxgrd


class TiltDerivativeException(Exception):
    pass


class DzMethod(Enum):
    fft = 0  # calculate vertitical derivative using FFT
    convolution = 1  # calculate vertical derivative by convolution


class GridUtility(gxgrd.Grid):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def de_trend(self, file_name=None):
        if self.dtype != np.float64:
            p = self.properties()
            p['dtype'] = np.float64
            ing = gxgrd.Grid.new(properties=p)
        else:
            ing = self
        dtg = gxgrd.Grid.new(file_name=file_name, properties=ing.properties())
        gxapi.GXIMU.grid_trnd(ing.gximg, dtg.gximg, 0, gxapi.IMU_TREND_EDGE, 1,
                              gxapi.GXVM.create(gxapi.GS_REAL, 10), 3)
        return dtg

    def vertical_derivative(self, file_name=None, method=DzMethod.fft, overwrite=False):

        # dz grid
        p = self.properties()
        p['dtype'] = np.float64
        dzg = gxgrd.Grid.new(file_name=file_name, properties=p, overwrite=overwrite)
        gxapi.GXIMU.grid_vd(
            .gximg, dzg.gximg)

        return dzg


def tilt_derivative(input_grid, output_grid, method=DzMethod.fft):
    """

    :param input_grid:
    :param output_grid:
    :param method:
    :return:
    """
    pass
