import matplotlib.colors as mc
import numpy as np
from scipy.spatial import KDTree
import cv2


class ColorNamer:
    def __init__(self):
        self.clut = {}
        self.clut_list = []
        self.clut_tree = None

        for name in mc.XKCD_COLORS:
            rgb = mc.to_rgb(mc.XKCD_COLORS[name])
            lab = cv2.cvtColor(np.single([[rgb]]), cv2.COLOR_RGB2Lab)[0][0]
            self.clut[tuple(lab)] = name[5:]
        self.clut_list = list(self.clut.keys())
        self.clut_tree = KDTree(self.clut_list)


    def name(self, rgb):
        lab = tuple(cv2.cvtColor(np.single([[rgb]]), cv2.COLOR_RGB2Lab)[0][0])
        dist, point = self.clut_tree.query(lab, 1)
        idx = int(point)
        key = self.clut_list[idx]
        return self.clut[key]
    