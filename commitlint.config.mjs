// Formato dei messaggi di commit: Conventional Commits (vedi CONTRIBUTING.md).
// Lo usano sia l'hook locale commit-msg sia la CI (.github/workflows/commits.yml).
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Scriviamo in italiano: maiuscole e minuscole libere nell'oggetto.
    "subject-case": [0],
    "header-max-length": [2, "always", 100],
    "body-max-line-length": [0],
    "footer-max-line-length": [0],
  },
};
