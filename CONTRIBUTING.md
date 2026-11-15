# Come contribuire

## Messaggi di commit

Usiamo [Conventional Commits](https://www.conventionalcommits.org/it/v1.0.0/):

```
<tipo>(<ambito opzionale>): <descrizione>
```

| tipo | quando |
|---|---|
| `feat` | nuova funzionalità o nuova pagina |
| `fix` | correzione di un bug |
| `style` | solo aspetto (CSS, spaziature), nessun cambio di logica |
| `refactor` | riscrittura senza cambiare il comportamento |
| `perf` | prestazioni |
| `docs` | documentazione, README, testi `.md` |
| `test` | test |
| `build` | dipendenze, configurazione di build |
| `ci` | workflow GitHub Actions |
| `chore` | manutenzione varia |
| `revert` | annulla un commit precedente |

Esempi:

```
feat(prezzi): aggiunge il piano annuale
fix: il menu a tendina non si chiudeva su mobile
style(home): riduce lo spazio sopra l'hero
```

Un commit come `fix navbar` o `modifiche` viene rifiutato.

## Hook locali

Gli hook sono in `lefthook.yml`. Si installano una volta per clone:

```sh
brew install lefthook
lefthook install
```
- **pre-commit**: formattazione e lint sui file in stage.
- **commit-msg**: rifiuta i messaggi fuori formato.

In caso di emergenza `git commit --no-verify` salta gli hook, ma la CI fa
gli stessi controlli e la PR resta rossa.

## CI (GitHub Actions)

Su ogni PR e su ogni push al branch principale:

- **CI / HTML e link**: htmlhint sull'HTML e controllo che pagine, immagini, CSS e JS collegati esistano.
- **Commits / Messaggi di commit**: tutti i commit nuovi e il titolo della PR rispettano il formato.
- **Commits / Segreti nel codice**: gitleaks cerca chiavi, token e password nei commit nuovi.

Con **Squash and merge** il titolo della PR diventa il messaggio del commit:
scrivilo già nel formato giusto.

Dependabot apre ogni lunedì una PR con gli aggiornamenti minori delle dipendenze.
