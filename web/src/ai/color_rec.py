import base64
import vertexai
from vertexai.generative_models import GenerativeModel, SafetySetting, Part


def color_recommendation(color_combo):
    vertexai.init(project="hlthy-421200", location="northamerica-northeast1")
    model = GenerativeModel(
        "gemini-1.0-pro-001",
    )
    
    text1_1 = f"Given this information about what I am wearing, give me the best and most fashionable color coordination options with each article of clothing. Describe each color in English and then put the hex in parenthesis after. {color_combo}"

    generation_config = {
        "max_output_tokens": 2048,
        "temperature": 0.9,
        "top_p": 1,
        "top_k": 1,
    }

    safety_settings = [
        SafetySetting(
            category=SafetySetting.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold=SafetySetting.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
        ),
        SafetySetting(
            category=SafetySetting.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold=SafetySetting.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
        ),
        SafetySetting(
            category=SafetySetting.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold=SafetySetting.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
        ),
        SafetySetting(
            category=SafetySetting.HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold=SafetySetting.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
        ),
    ]

    chat = model.start_chat()
    response = chat.send_message(
        [text1_1],
        generation_config=generation_config,
        safety_settings=safety_settings
    )

    return response.candidates[0].content.parts[0].text

color_combination = "shirt: #2b2b2b, pants: #c5b9a9, belt: #222222, shoes: #303030, bag: #000000"

print(color_recommendation(color_combination))