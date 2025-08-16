# Healthcare Translation Web App

## Project Overview
**Description:**  
This web-based application enables real-time, multilingual communication between patients and healthcare providers. Users can speak naturally into the microphone, and their speech is transcribed, translated, and converted back into audio for playback. The application aims to remove language barriers in healthcare communication.

**Technologies Used:**  
- Backend: Node.js, Express.js  
- Frontend: HTML, CSS, JavaScript  
- AI Services: Gemini AI (for filtering irrelevant information), OpenAI API (for faster and efficient processing)  
- Hosting Platform: Railway  

**Project URL:** https://healthcaretranslation-production.up.railway.app/

---

## Key Features
1. **Voice Input Capture:** Real-time transcription of spoken input.  
2. **Translation:** Converts transcribed text into the selected target language.  
3. **Text-to-Speech:** Plays back translated text as audio.  
4. **Irrelevant Information Filtering:** Gemini AI removes extra or unrelated conversation content.  
5. **Interactive UI:** User-friendly and responsive interface.  
6. **Multilingual Support:** Supports multiple input and output languages.  

---

## How to Use
1. Open the application using the deployed URL.  
2. Click the microphone icon to start voice input.  
3. Speak clearly; your sentence will appear in the live transcript.  
4. The system translates the text into the selected language.  
5. The translated audio plays automatically.  
6. Irrelevant content is filtered automatically using Gemini AI.  

---

## Limitations
- Limited number of supported languages due to free API restrictions.  
- Voice input may be inconsistent due to free speech-to-text services.  
- Translation may take longer as the process goes through Gemini first and then Hugging Face models.  

---

## Future Advancements
- Fully integrate **OpenAI API** for faster and more efficient processing.  
- Expand support for additional languages.  
- Improve voice recognition accuracy.  
- Include conversation history with timestamps.  
- Enhance medical term recognition for precise healthcare communication.  
- Develop offline translation capabilities for areas with limited internet access.  

---

## License
This project is licensed under the ISC License.
