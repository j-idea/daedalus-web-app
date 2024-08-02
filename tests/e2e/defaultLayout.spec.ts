import { expect, test } from "@playwright/test";

test("Can access data from the R API", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/`);

  const html = await page.innerHTML("body");
  await expect(html).toContain("Home page");
  expect(html).toMatch(/Model version: (\d+\.)?(\d+\.)?(\*|\d+)/);
});

// In this test, we're using toBeInViewport instead of toBeVisible, because when the sidebar is
// off the screen, it's still 'visible' by Playwright's definition, but it's not in the viewport.
// At least, that's the case on mobile devices.
test("Can open sidebar by use of the toggle in the app header", async ({ page, baseURL, isMobile }) => {
  if (isMobile) { // Sidebar toggle behaviour only exists on smaller screens
    console.log('Now, baseURL is...')
    console.log(baseURL)

    await page.goto(`${baseURL}/`);

    const html = await page.innerHTML("body");
    await expect(html).toContain("Home page");

    const sidebarNav = await page.getByText("New scenario");
    // Verify that the sidebar is hidden
    await expect(sidebarNav).not.toBeInViewport();

    const sidebarToggle = await page.getByTestId("toggle-sidebar-button");
    await sidebarToggle.click();

    await expect(sidebarNav).toBeInViewport();

    // On mobile, the sidebar obscures the control in the header, so we use
    // other means to close it.
    // I couldn't get Playwright to click outside the sidebar, so in order to
    // trigger the sidebar to close we send an 'escape' keypress.
    await page.keyboard.press("Escape");

    await expect(sidebarNav).not.toBeInViewport();
  }
});
