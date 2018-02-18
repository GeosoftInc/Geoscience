/-------------------------------------------------------------------------
/ Tilt Derivative script GGC 9/4/08
/  Note: Input mag grid needs to be RTP
/-------------------------------------------------------------------------
INTERACTIVE		 ON
SETINI         TILTDRV.OUT=".\\tiltdrv_rtp_rad.grd(GRD)"
SETINI         TILTDRV.OUT2=".\\tilt_HD.grd(GRD)"
SETINI         TILTDRV.METHOD="0"
GX             tiltdrv.gx
INTERACTIVE		 OFF
/-------------------------------------------------------------------------
/ Display map using grayscale tilt.zon
/-------------------------------------------------------------------------
SETINI         GRIDIMG1.NEW="1"
SETINI         GRIDIMG1.GRID=".\\tiltdrv_rtp_rad.grd(GRD)"
SETINI         GRIDIMG1.ZONE="1"
SETINI         GRIDIMG1.COLOR=".\\tilt2.zon"
SETINI         GRIDIMG1.BRIGHT="0.0"
SETINI         GRIDIMG1.CONTOUR="0.4636476"
SETINI         GRIDIMG1.REG="0"
SETINI         IMGRANGE.FILE=".\\tiltdrv_rtp_rad.grd(GRD)"
SETINI         DEFMAP.MAP="tilt_rtp_rad"
SETINI         DEFMAP.NEWMAP="tilt_zone.map"
SETINI         DEFMAP.MAP=""
SETINI         DEFMAP.MAPSCALE=""
GX             gridimg1.gx
/-------------------------------------------------------------------------
/ Contour zero line
/-------------------------------------------------------------------------
SETINI         CONTOUR.GRID=".\\tiltdrv_rtp_rad.GRD(GRD)"
SETINI         CONTOUR.TYPE="1"
SETINI         CONTOUR.LEV1="0"
SETINI         CONTOUR.SMOOTH="0"
GX             scont32.gx
/-------------------------------------------------------------------------
/ Export to shp; import to GDB
/-------------------------------------------------------------------------
SETINI         EXPMAP.FILE=".\\tilt0.shp"
SETINI         EXPMAP.MODE="0"
SETINI         EXPMAP.ALL="1"
SETINI         EXPMAP.FORMAT="SHP"
SETINI         EXPMAP.VIEW="Data"
SETINI         EXPMAP.RES="1.0"
GX             EXPMAP
SETINI         IMPORTARC.FILES=".\\tilt0_lnz.shp"
SETINI         IMPORTARC.DBOUT="4"
SETINI         IMPORTARC.MAPOUT="2"
SETINI         IMPORTARC.VIEW="0"
SETINI         IMPORTARC.DB=".\\pts.gdb"
GX             importarc.gx
/   Resample GDB to equal spacing
/-------------------------------------------------------------------------
/ Make a Distance channel
/-------------------------------------------------------------------------
CURRENT        Database,".\\pts_tilt0_lnz_Shapes.gdb"
SETINI         DISTCHAN.USE_CARTESIAN="0"
SETINI         DISTCHAN.X="X"
SETINI         DISTCHAN.Y="Y"
SETINI         DISTCHAN.Z=""
SETINI         DISTCHAN.OUT="Dist"
GX             geogxnet.dll(Geosoft.GX.Database.DistanceChannel;Run)
/--------------------------------------------------------------------------
/  Re-sample to "nominal" distance spacing along contour
/--------------------------------------------------------------------------
CURRENT        Database,".\\pts_tilt0_lnz_Shapes.gdb"
SETINI         REFIDDB.REF="Dist"
SETINI         REFIDDB.START=""
SETINI         REFIDDB.INCR=""
SETINI         REFIDDB.GAP=""
SETINI         REFIDDB.METHOD="Linear"
GX             refiddb.gx
/-------------------------------------------------------------------------
/  extract HD to GDB 
/-------------------------------------------------------------------------
CURRENT        Database,".\\pts_tilt0_lnz_Shapes.gdb"
SETINI         GRIDSAMP.X="X"
SETINI         GRIDSAMP.Y="Y"
SETINI         GRIDSAMP.Z="HD"
SETINI         GRIDSAMP.GRID=".\\tilt_HD.grd(GRD)"
GX             gridsamp.gx
/--------------------------------------------------------------------------
/   Calculate depth from HD
/--------------------------------------------------------------------------
SETINI         MATHEXPRESSIONBUILDER.CHANNELINPUTBOX="C0 = 1/C1"
SETINI         MATHEXPRESSIONBUILDER.CHANNELEXPRESSIONFILE=""
SETINI         MATHEXPRESSIONBUILDER.CHANNELSTOREDID0="C2"
SETINI         MATHEXPRESSIONBUILDER.CHANNELSTOREDVALUE0="Depth"
SETINI         MATHEXPRESSIONBUILDER.CHANNELSTOREDID1="C0"
SETINI         MATHEXPRESSIONBUILDER.CHANNELSTOREDVALUE1="Depth"
SETINI         MATHEXPRESSIONBUILDER.CHANNELSTOREDID2="C1"
SETINI         MATHEXPRESSIONBUILDER.CHANNELSTOREDVALUE2="HD"
SETINI         MATHEXPRESSIONBUILDER.CHANNELNUMSTORED="3"
SETINI         MATHEXPRESSIONBUILDER.CHANNELTRIGUNITS="Radians"
GX             geogxnet.dll(Geosoft.GX.MathExpressionBuilder.MathExpressionBuilder;RunChannel)
/-------------------------------------------------------------------------



