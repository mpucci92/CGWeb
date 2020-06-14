from datetime import datetime
import pandas as pd
import sys, os
import json

###################################################################################################

DIR = os.path.realpath(os.path.dirname(__name__))

COLS = [
	"option_id",
	"volume",
	"open_interest",
	"bid",
	"option_price",
	"ask",
	"rho",
	"vega",
	"theta",
	"gamma",
	"delta",
	"implied_volatility",
	"strike_price",
]
COLS_FMT = [
	"Volume",
	"Open Int.",
	"Bid",
	"Price",
	"Ask",
	"Rho",
	"Vega",
	"Theta",
	"Gamma",
	"Delta",
	"I.V",
	"Strike"
]
COLS_FMT += COLS_FMT[::-1][1:]
IDXC, IDXP = 5, 17
PARSER = "lxml"

TAS_COLS = [
	'username',
	'execution_time',
	'position_id',
	'option_id',
	'quantity'
]

###################################################################################################

with open(f"{DIR}/config.json", "r") as file:
	CONFIG = json.loads(file.read())

with open(f"{DIR}/config.json", "w") as file:
	CONFIG['date'] = datetime.now().strftime("%Y-%m-%d")
	file.write(json.dumps(CONFIG))

###################################################################################################
