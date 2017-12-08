# -*- coding: utf-8 -*-

from pyswip.prolog import Prolog
from pyswip.easy import Functor, registerForeign, call
import sys

KB = """
restaurant('Fritz', 7, 2, [english, korean], [coffee, bakery], []).
restaurant('Seoul Chicken', 8, 5, [english], ['fried chicken'], [pescatarian]).
restaurant('Just Steak', 15, 6, [english, korean], [bbq],[]).
restaurant('Gyeongcheon Aein', 10, 3, [korean], [korean], []).
restaurant('Goldfish Dimsum Cuisine' , 5, 2, [korean, chinese], [chinese], [vegetarian]).
restaurant('Tutto Bene', 10, 2, [english], [italian], []).
restaurant('Rye Post', 9, 5, [english], [burgers], []).
restaurant('Roya Toya' , 9, 4, [korean, english], [korean], []).
restaurant('Louis Cinq', 14, 8, [french, english], [french], []).
restaurant('Braai Republic' , 10, 8, [english], [fine_dining], []).
restaurant('I Am A Burger', 9, 5, [english], [burgers], ['nut allergy']).
restaurant('Itaewon The Burger', 11, 5, [english], [burgers, salads], []).
restaurant('Gimpob Next Door', 4, 0, [english, korean], [korean, 'fast food'], []).
restaurant('Bean Brothers' ,7, 1, [english], [coffee,tea, dessert], [vegan]).
restaurant('Flower Cafe', 6, 1, [english], [tea, coffee], [vegan]).
restaurant('Ichiban Ramen', 8, 2, [korean, japanese], [japanese], []).
restaurant('Firebell', 8, 10, [english], [burgers], []).
restaurant('Nanumi Tteokbokki', 6, 11, [korean], [korean], [vegetarian]).
restaurant('Parkview', 20, 10, [english], [brunch], []).
restaurant('Mcdonalds', 5, 1, [english], ['fast food'], []).
restaurant('Dunkin_Donuts', 2, 1, [english], ['fast food', dessert], []).
restaurant('Original Pancake House', 15, 3, [english], [brunch, american_diner], []).
restaurant('Coffee Bean', 5, 1, [english], [coffee, tea, coffee_chain], [vegan]).
restaurant('Starbucks', 4, 1, [english], [coffee, tea, coffee_chain], [vegan]).
restaurant('World of Beer' , 8, 2, [english], [brunch, beer, 'american diner', 'fast food'], []).
restaurant('Pizza School' , 5, 2, [korean], [pizza], []).
restaurant('Jeju King BBQ Pork', 18, 4, [english, korean], [bbq], ['gluten-free']).
restaurant('Juicy' , 5, 0, [english], ['juices/smoothies', coffee],[]).
restaurant('Cafe Mamas', 10, 2, [english], [salads,coffee], [vegan]).
restaurant('Jung Sik', 75, 9, [korean], [fine_dining], []).
restaurant('Cheezy Italiano',11, 2, [english], [italian, beer], [vegetarian]).
restaurant('Mimi Myeonga', 20, 6, [english, korean], [korean], []).
restaurant('Mifendang', 12, 18, [english, korean], [korean],[]).
restaurant('Bangkok Express' , 17, 12, [english, chinese, korean], [chinese], []).
restaurant('Pizzeria d\'buzza', 14, 5, [english, korean], [italian], []).
restaurant('Samonim Donkatsu', 15, 4, [english, korean], [brunch], []).
restaurant('Burger King', 9, 1,  [english, korean], [burgers], []).
restaurant('New York Burger', 15, 2, [korean, english], [burgers, 'american diner'], []).
restaurant('Otsal', 13, 5, [english, korean], [indian], []).
restaurant('El Taco', 10, 4, [english, korean], [mexican], []).
restaurant('Kisara', 13, 3, [english, korean, japanese], [japanese], []).
restaurant('Pizzarium', 14, 2, [korean, english], [pizza], []).
restaurant('Caffe Pascucci', 5, 0, [english, korean], ['coffee chain', coffee], []).
restaurant('Melting Shop', 11, 3, [english, korean], [sandwiches], []).
restaurant('Butanchu', 13, 4, [english], [english, korean, japanese], []).
restaurant('Brooklyn Burger', 15, 2, [english], [burgers, brunch, 'american diner'], []).
restaurant('Naan Palace', 18, 12, [english, korean], [indian], [vegetarian]).
restaurant('Julio', 10, 4, [english, korean], [mexican], []).
restaurant('Linus BBQ', 15, 2, [english, korean], [bbq, 'fine dining', 'pub food'], []).
restaurant('Brick Oven', 14, 1, [english], [pizza, 'pub food', beer, salads], []).
restaurant('Jacoby Burger', 11, 4, [english], [burgers, salads, beer], []).
restaurant('Hoya Sushi', 9, 1, [japanese, korean, english], [japanese], []).
restaurant('Jamba Juice', 3, 0, [korean, english], ['juices/smoothies'], []).
restaurant('Smoothie King', 3, 3, [english],  ['juices/smoothies'], [vegan]).

vegetarian :- vegan; salads.
pescatarian :- vegan; vegetarian.
"""

with open("LBA_KB.pl", "w") as f:
    f.write(KB)

prolog = Prolog()  # Global handle to interpreter

retractall = Functor("retractall")
known = Functor("known", 3)


# Define foreign functions for getting user input and writing to the screen
def write_py(X):
    print(str(X))
    sys.stdout.flush()
    return True


def read_py(A, V, Y):
    Y.unify(raw_input(str(A) + " is " + str(V) + "?"))
    return True


write_py.arity = 1
read_py.arity = 3

registerForeign(read_py)
registerForeign(write_py)

prolog.consult("KB_A.pl")  # open the KB
call(retractall(known))
for soln in prolog.query("restaurant(Name,Cost,Distance,Language,Type,Restriction), Cost<10, Distance<10, member(korean,Language), member(pizza, Type).", maxresult=1):
    print("Your problem is " + soln['X'])
