# IT mit alles

Static website for the Munich-based IT service. The site intentionally uses only HTML, CSS, and a small JavaScript layer for language switching, mobile navigation, and the contact form. This keeps it fast, affordable, and easy to maintain.

## Deployment

A push to `main` starts `.github/workflows/pages.yml` and publishes the website through GitHub Pages.

## Contact Form (Web3Forms)

The form in `index.html` (`#contact-form`) uses [Web3Forms](https://web3forms.com/) to send an email to `tim@itmitalles.de` without a custom server:

1. Enter the email address `tim@itmitalles.de` on web3forms.com and copy the access key you receive.
2. In `index.html`, replace the `YOUR_WEB3FORMS_ACCESS_KEY` placeholder (`<input type="hidden" name="access_key" ...>`) with the real key.

Until then, form submission will fail with an error; the email and WhatsApp links work immediately regardless.

## Before Going Public

- [x] Legal notice completed with the real name, service address, and contact details (Tim-Lion Niedermaier / IT mit alles, Werinherstr. 110, 81541 Munich).
- [ ] Add the Web3Forms access key (see above), otherwise the contact form will not send.
- [ ] Align the privacy policy with the actual email, form (Web3Forms), and hosting infrastructure.
- [ ] Verify that `tim@itmitalles.de` is configured as a mailbox.
- [ ] Point DNS for `itmitalles.de` and optionally `www.itmitalles.de` to GitHub Pages.

## Content Guidelines

The positioning follows the existing business plan: small companies and teams of up to around ten employees, freelancers, and private individuals; networks and Wi-Fi, devices and workstations, servers and cloud, plus e-commerce and the web. The service provides practical help on request, subject to agreement and current availability — without rigid SLAs, 24/7 promises, or unnecessary monthly retainers. Monitoring and ongoing support are intentionally not part of the initial offering.
