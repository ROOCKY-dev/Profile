from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1920, "height": 1080})

        # 1. Home Page
        print("Navigating to Home...")
        page.goto("http://localhost:3000")
        page.wait_for_selector('h1', state='visible')
        time.sleep(2) # Wait for animations
        page.screenshot(path="verification_home.png")
        print("Home screenshot taken.")

        # 2. Project Detail
        # Find a project link. The project cards are links to /work/[slug]
        # I'll try to find the first project card
        print("Navigating to Project...")
        # Hover over the first project to trigger effects
        # The project card is a Link with href starting with /work/
        project_link = page.locator('a[href^="/work/"]').first
        if project_link.count() > 0:
            project_link.hover()
            time.sleep(1)
            project_link.click()
            page.wait_for_selector('h1', state='visible')
            time.sleep(2)
            page.screenshot(path="verification_project.png")
            print("Project screenshot taken.")
        else:
            print("No project link found!")

        # 3. 404 Page
        print("Navigating to 404...")
        page.goto("http://localhost:3000/non-existent-page-123")
        page.wait_for_selector('h1', state='visible') # Should see 404
        time.sleep(2)
        page.screenshot(path="verification_404.png")
        print("404 screenshot taken.")

        browser.close()

if __name__ == "__main__":
    run()
