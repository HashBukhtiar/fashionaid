import matplotlib.colors as mcolors
from sklearn.cluster import KMeans
import webcolors
import json
import copy
from test import ColorNamer

def hex_to_rgb(hex_color):
    """Convert hex color to RGB."""
    return mcolors.hex2color(hex_color)

def rgb_to_hsv(rgb_color):
    """Convert RGB color to HSV."""
    return mcolors.rgb_to_hsv(rgb_color)

def hsv_to_rgb(hsv_color):
    """Convert HSV color to RGB."""
    return mcolors.hsv_to_rgb(hsv_color)

def generate_complementary_color(hex_color):
    """Generate complementary color for the given hex color."""
    rgb_color = hex_to_rgb(hex_color)
    hsv_color = rgb_to_hsv(rgb_color)
    
    # Shift hue by 180 degrees to generate the complementary color
    comp_hsv = (hsv_color[0] + 0.5) % 1.0, hsv_color[1], hsv_color[2]
    comp_rgb = hsv_to_rgb(comp_hsv)
    
    return mcolors.to_hex(comp_rgb)

def generate_analogous_colors(hex_color):
    """Generate analogous color scheme for the given hex color."""
    rgb_color = hex_to_rgb(hex_color)
    hsv_color = rgb_to_hsv(rgb_color)
    
    # Create 3 analogous colors by adjusting hue by small amounts (30 degrees)
    analogous_hues = [(hsv_color[0] + i * 0.0833) % 1.0 for i in range(3)]
    
    analogous_hsv = [(hue, hsv_color[1], hsv_color[2]) for hue in analogous_hues]
    analogous_rgb = [hsv_to_rgb(hsv) for hsv in analogous_hsv]
    
    return [mcolors.to_hex(rgb) for rgb in analogous_rgb]

def generate_triadic_colors(hex_color):
    """Generate triadic color scheme for the given hex color."""
    rgb_color = hex_to_rgb(hex_color)
    hsv_color = rgb_to_hsv(rgb_color)
    
    # Shift hue by 120 degrees to generate two other triadic colors
    triadic_hues = [(hsv_color[0] + i/3) % 1.0 for i in range(3)]
    
    triadic_hsv = [(hue, hsv_color[1], hsv_color[2]) for hue in triadic_hues]
    triadic_rgb = [hsv_to_rgb(hsv) for hsv in triadic_hsv]
    
    return [mcolors.to_hex(rgb) for rgb in triadic_rgb]

def generate_tetradic_colors(hex_color):
    """Generate tetradic (double-complementary) color scheme for the given hex color."""
    rgb_color = hex_to_rgb(hex_color)
    hsv_color = rgb_to_hsv(rgb_color)
    
    # First complementary pair: (H, H + 0.5)
    tetradic_1 = (hsv_color[0] + 0.25) % 1.0
    tetradic_2 = (hsv_color[0] + 0.75) % 1.0
    
    tetradic_hsv = [(hsv_color[0], hsv_color[1], hsv_color[2]),
                    (hsv_color[0] + 0.5, hsv_color[1], hsv_color[2]),
                    (tetradic_1, hsv_color[1], hsv_color[2]),
                    (tetradic_2, hsv_color[1], hsv_color[2])]
    
    tetradic_rgb = [hsv_to_rgb(hsv) for hsv in tetradic_hsv]
    
    return [mcolors.to_hex(rgb) for rgb in tetradic_rgb]

def generate_split_complementary_colors(hex_color):
    """Generate split-complementary color scheme for the given hex color."""
    rgb_color = hex_to_rgb(hex_color)
    hsv_color = rgb_to_hsv(rgb_color)
    
    # Complementary color is (H + 0.5), split-complementary colors are at +/- 0.333
    split_1 = (hsv_color[0] + 0.333) % 1.0
    split_2 = (hsv_color[0] + 0.667) % 1.0
    
    split_complementary_hsv = [(split_1, hsv_color[1], hsv_color[2]),
                               (split_2, hsv_color[1], hsv_color[2])]
    
    split_complementary_rgb = [hsv_to_rgb(hsv) for hsv in split_complementary_hsv]
    
    return [mcolors.to_hex(rgb) for rgb in split_complementary_rgb]

# def cluster_colors(hex_colors, n_clusters=3):
#     """Cluster colors into groups to suggest harmonious combinations."""
#     rgb_colors = np.array([hex_to_rgb(color) for color in hex_colors])
#     kmeans = KMeans(n_clusters=n_clusters)
#     kmeans.fit(rgb_colors)
#     clustered_colors = kmeans.cluster_centers_
#     return [mcolors.to_hex(color) for color in clustered_colors]

def suggest_outfit_combinations_with_context(color_dict):
    """Suggest outfit combinations with clothing item context (e.g., sweater, pants)."""
    combinations = []
    
    # Suggest color schemes for each clothing item
    for clothing_item, hex_color in color_dict.items():
        complementary = generate_complementary_color(hex_color)
        analogous_colors = generate_analogous_colors(hex_color)
        triadic_colors = generate_triadic_colors(hex_color)
        tetradic_colors = generate_tetradic_colors(hex_color)
        split_complementary_colors = generate_split_complementary_colors(hex_color)
        
        combinations.append({
            'clothing_item': clothing_item,
            'hex_color': hex_color,
            'complementary': complementary,
            'analogous': analogous_colors,
            'triadic': triadic_colors,
            'tetradic': tetradic_colors,
            'split_complementary': split_complementary_colors
        })
    
    return combinations



def hex_to_color_name(hex_code):
    """Convert a hex code to the closest color name."""
    try:
        # Attempt to get the exact name of the color
        color_name = webcolors.hex_to_name(hex_code)
    except ValueError:
        # If the exact color name is not found, get the closest match
        rgb_color = webcolors.hex_to_rgb(hex_code)
        closest_name = None
        closest_distance = float('inf')
        for name, value in webcolors.CSS3_NAMES_TO_HEX.items():
            # Calculate the distance between the colors in RGB space
            r, g, b = webcolors.hex_to_rgb(value)
            distance = (r - rgb_color.red) ** 2 + (g - rgb_color.green) ** 2 + (b - rgb_color.blue) ** 2
            if distance < closest_distance:
                closest_name = name
                closest_distance = distance
        color_name = closest_name
    return color_name


# json_string = '{"sweater": "#48494b", "pants": "#e0d9d5", "lanyard": "#9074c5"}'

json_string = '{"jacket": "#3b4c59", "jeans": "#a9b7c1", "scarf": "#7c5a5e"}'

# Convert the JSON string into a Python dictionary
color_dict = json.loads(json_string)

# input_colors = list(color_dict.values())
# print(input_colors)

suggested_combinations = suggest_outfit_combinations_with_context(color_dict)
print(suggested_combinations)
print()
updated_combinations = copy.deepcopy(suggested_combinations)

# Initialize the ColorNamer
cn = ColorNamer()

# Iterate over each item in the updated_combinations
for item in updated_combinations:
    # Iterate through each key-value pair in the item
    for key, value in item.items():
        if key != "clothing_item":
            # If the key is not 'clothing_item' and is a hex code (string), convert to English name
            if isinstance(value, str):  # For single hex color values
                item[key] = cn.name(hex_to_rgb(value))
            elif isinstance(value, list):  # For 'triadic' key with a list of hex codes
                item[key] = [cn.name(hex_to_rgb(color)) for color in value]

# Print the updated combinations with English color names
for item in updated_combinations:
    print(item)
    print()

