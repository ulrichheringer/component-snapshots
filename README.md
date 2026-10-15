# component-snapshots

Galeria React pequena para inspecionar componentes e seus estados em uma tela local. O script de captura usa Playwright para gerar uma imagem de cada cartão em três larguras.

## Executar

Requer Node.js 20.19 ou superior. Instale dependências com **npm install**; rode **npm run dev** para abrir a galeria. Para capturar as imagens, instale o Chromium uma vez com **npx playwright install chromium** e execute **npm run screenshots**. Os PNGs vão para screenshots/ (pasta ignorada pelo Git).

**npm test** valida o catálogo e seus filtros. **npm run build** produz o site estático em dist/.
