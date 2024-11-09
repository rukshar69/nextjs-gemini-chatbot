import time
from playwright.sync_api import sync_playwright

# Constants
CHAT_URL = "http://localhost:3000"
USER_INPUT_SELECTOR = 'input[name="input-field"]'
SEND_BUTTON_SELECTOR = 'button[type="submit"]'
USER_CHAT_BUBBLE_SELECTOR = '.user-chat .message'
AI_CHAT_BUBBLE_SELECTOR = '.ai-chat .message'

# Test case for chat flow
def test_chat_flow():
    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch(headless=False)
        context = browser.new_context()
        page = context.new_page()

        # Navigate to the chat page
        page.goto(CHAT_URL)

        # Verify page loads correctly
        assert page.title() == "Adventure AI Chat Game"  # Change title if needed

        # Send a user message
        user_message = "Hi, tell me a story!"
        page.fill(USER_INPUT_SELECTOR, user_message)
        page.click(SEND_BUTTON_SELECTOR)

        # Verify user's message appears in the chat bubble
        page.wait_for_selector(USER_CHAT_BUBBLE_SELECTOR)
        assert user_message in page.text_content(USER_CHAT_BUBBLE_SELECTOR)

        # Wait for AI response
        page.wait_for_selector(AI_CHAT_BUBBLE_SELECTOR, timeout=15000)  # 15 seconds timeout

        # Verify AI response appears
        ai_response = page.text_content(AI_CHAT_BUBBLE_SELECTOR)
        assert ai_response is not None and len(ai_response.strip()) > 0

        # Print out the AI's response for debugging purposes
        print(f"AI Response: {ai_response}")

        # Wait for 3 seconds before closing the browser
        time.sleep(3)

        # Close browser
        context.close()
        browser.close()


