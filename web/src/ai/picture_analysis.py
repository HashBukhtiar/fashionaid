import base64
import vertexai
from vertexai.generative_models import GenerativeModel, SafetySetting, Part
from sample_images import image1_base64
from color_rec import color_recommendation

def analyze_image(base64_string):
    vertexai.init(project="hlthy-421200", location="northamerica-northeast1")

    image1_1 = Part.from_data(
        mime_type="image/jpeg",
        data=base64.b64decode(base64_string),
    )
    textsi_1 = """State everything possible about what the person is wearing in this JSON format. Try to find the most dominant hex code.
    {article1: color1, article2 - color2} 

    For example:
    {shirt: #333333, pants: #d9b68a}"""

    generation_config = {
        "max_output_tokens": 8192,
        "temperature": 1,
        "top_p": 0.95,
    }

    safety_settings = [
        SafetySetting(
            category=SafetySetting.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold=SafetySetting.HarmBlockThreshold.OFF
        ),
        SafetySetting(
            category=SafetySetting.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold=SafetySetting.HarmBlockThreshold.OFF
        ),
        SafetySetting(
            category=SafetySetting.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold=SafetySetting.HarmBlockThreshold.OFF
        ),
        SafetySetting(
            category=SafetySetting.HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold=SafetySetting.HarmBlockThreshold.OFF
        ),
    ]

    model = GenerativeModel(
        "gemini-1.5-flash-001",
        system_instruction=[textsi_1]
    )
    chat = model.start_chat()
    response = chat.send_message(
        [image1_1, textsi_1],
        generation_config=generation_config,
        safety_settings=safety_settings
    )
    print(type(response))
    return color_recommendation(response.candidates[0].content.parts[0].text)

if __name__ == "__main__":
    # For testing purposes
    print(analyze_image(image1_base64))