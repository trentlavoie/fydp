from sklearn.metrics import mean_squared_error
from math import sqrt

# Imports
import os
import pickle
import pandas as pd
from datetime import datetime
import numpy as np
import skfuzzy as fuzz
from skfuzzy import control as ctrl
import matplotlib.pyplot as plt
from sklearn import svm
from sklearn.model_selection import train_test_split
from sklearn.model_selection import KFold, cross_val_score
import flModel

DATA_FILE = 'data/model_vectors.csv'
df = pd.read_csv(DATA_FILE)

def generate_user_vec(driving_log, web_map, m):
    run_df = m.format_df([driving_log])

    num_of_brakes_average, num_of_brakes_stepped = m.count_braking_steps(run_df)

    average_acc = run_df[run_df['acc'] > 0]['acc'].mean()
    average_rpm = run_df['rpm'].mean()
    average_vel = run_df['speed'].mean()
    average_throttle = run_df['throttle'].mean()
    average_lateral = run_df['lateral_velocity'].apply(abs).mean()


    run_df['deacc'] = -1 * run_df['acc']
    run_df = run_df.query('deacc > 1')

    average_deacc = run_df['deacc'].mean()

    brake_score = m.compute_brake(average_deacc, num_of_brakes_stepped)
    hp_score = m.compute_hp(average_acc, average_rpm)
    torque_score = m.compute_torque(average_vel, average_throttle)
    lateral_score = m.calculate_score(average_lateral, m.average_lateral_overall, m.max_lateral)



    fuel_economy = 1.0
    fuel_pref = web_map.get('fuel_economy', 1)
    if fuel_pref == 2:
        fuel_economy = 3
    elif fuel_pref == 3:
        fuel_economy = 5.0
    return [hp_score, torque_score, brake_score, lateral_score, fuel_economy]

def norm_fuel(row, web_map):
#     return 1.0
    fuel_economy = 1.0
    fuel_pref = web_map.get('fuel_economy', 1)
    if fuel_pref == 2:
        if row.FuelEconomy >= 3:
            fuel_economy = 3
        else:
            fuel_economy = row.FuelEconomy
    elif fuel_pref == 3:
        fuel_economy = row.FuelEconomy
    return fuel_economy

# if fuel economy > 2.5 = 2.5


def calc_rmse(row, user_vec):
    car_vector = [row.HP, row.Torque, row.Braking, row.RoadHolding, row.FuelEconomyNorm]
    return sqrt(mean_squared_error(user_vec, car_vector))

def filter_cars(row, web_map=dict()):
    cond1 = row.Price > web_map.get('price_min', 0)
    cond2 = row.Price < web_map.get('price_max', 100000)
    cond3 = True
    fuel_pref = web_map.get('fuel_economy', 1)
    if fuel_pref == 2 and row.FuelEconomy < 1:
        cond3 = False
    elif fuel_pref == 3 and row.FuelEconomy < 2:
        cond3 = False
    cond4 = False
    if row['Body'] in set(web_map.get('body_types', ['Sedan'])):
        cond4 = True
    return cond1 & cond2 & cond3 & cond4

def find_car(models_file, driving_log, web_inputs, fuzzy_model):
    user_vector = generate_user_vec(driving_log, web_inputs, fuzzy_model)
    df = pd.read_csv(models_file).dropna()

    # Apply filtering
    df = df[df.apply(lambda x: filter_cars(x, web_inputs), axis=1)]
#     df[df.apply(lambda x: x['b'] > x['c'], axis=1)]
    df['FuelEconomyNorm'] = df.apply(lambda x: norm_fuel(x, web_inputs), axis=1)
    df['rmse_score'] = df.apply(lambda x: calc_rmse(x,user_vector), axis=1)
    df['percent_match'] = df.apply(lambda x: (5 - x.rmse_score) * 20, axis=1)
    rmse_norm_factor = df.rmse_score.min() / 2
    df['percent_match_norm'] = df.apply(lambda x: (5 - x.rmse_score + rmse_norm_factor) * 20, axis=1)
    return df.sort_values(by=['rmse_score'])

def return_rmse(price, fuel_economy, data_file_name='run_40.csv', car_body=['Sedan', 'Coupe']):

    web_mapping = {
        'price_min': 0,
        'price_max': int(price),
        'fuel_economy': 1, # 1,2,3
        'body_types': car_body,
    }

    with open('models/fuzzy_models.p', 'rb') as handle:
        fuzzy_models = pickle.load(handle)

    model = find_car(DATA_FILE, 'tmp/' + data_file_name, web_mapping, fuzzy_models)
    list_of_cars = model.T.to_dict().values()

    return list_of_cars
