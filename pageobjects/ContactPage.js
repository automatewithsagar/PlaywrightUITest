class ContactPage {
    constructor(page) {
        this.page = page;
        this.feedbackOrQuestionsSection = 'text=Feedback or Questions';
    }

    async isContactPageOpen() {
        // Checks for Feedback or Questions section
        return await this.page.isVisible(this.feedbackOrQuestionsSection);
    }
}

module.exports = { ContactPage };
