import base64
import vertexai
from vertexai.generative_models import GenerativeModel, SafetySetting, Part


def multiturn_generate_content(base64_string):
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
    print(chat.send_message(
        [image1_1, textsi_1],
        generation_config=generation_config,
        safety_settings=safety_settings
    ))

image1_base64 = "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"

multiturn_generate_content(image1_base64)