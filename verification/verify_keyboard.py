from playwright.sync_api import sync_playwright

def verify_keyboard(page):
    # 1. Navigate to the app
    page.goto("http://localhost:9002")

    # 2. Navigate to Practice (Multiplication Tables)
    page.get_by_text("Multiplication Tables").click()

    # 3. Select a table (e.g., "2")
    # Use exact match or role
    page.get_by_role("button", name="2", exact=True).click()

    # 4. Click Start
    page.get_by_role("button", name="Start").click()

    # 5. Now we should be on ExecutionScreen.
    page.wait_for_selector(".fixed.bottom-0")

    # 6. Type "12" using the virtual keyboard.
    # The keyboard buttons are also buttons.
    # The keyboard button "1" might conflict with other buttons if not careful.
    # We can use the parent container to scope it.
    keyboard = page.locator(".fixed.bottom-0")
    keyboard.get_by_text("1").click()
    keyboard.get_by_text("2").click()

    # 7. Take screenshot of the keyboard and input
    page.screenshot(path="verification/keyboard_verification.png")

    # 8. Verify input value
    input_value = page.evaluate("document.getElementById('answer-input').value")
    print(f"Input value: {input_value}")
    assert input_value == "12"

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_keyboard(page)
        except Exception as e:
            print(e)
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()
