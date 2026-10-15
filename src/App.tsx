import { useMemo, useState } from "react";
import { componentCatalog, filterCatalog, type Category, type ComponentEntry } from "./catalog";

const categories: Category[] = ["Todos", "Controles", "Conteúdo", "Feedback"];

function Preview({ entry }: { entry: ComponentEntry }) {
  if (entry.id === "buttons") return <div className="button-stack"><button className="btn-primary">Criar projeto <span aria-hidden="true">↗</span></button><button className="btn-secondary">Salvar rascunho</button><button className="btn-disabled" disabled>Indisponível</button></div>;
  if (entry.id === "search-field") return <form className="search-form" onSubmit={(event) => event.preventDefault()}><label htmlFor="demo-search">Buscar por nome</label><div className="input-wrap"><span aria-hidden="true">⌕</span><input id="demo-search" placeholder="Ex.: Ana Martins" /><button type="submit">Buscar</button></div><small>Use o nome completo ou parte dele.</small></form>;
  if (entry.id === "profile-card") return <article className="profile"><div className="avatar" aria-hidden="true">AM</div><div className="profile-copy"><strong>Ana Martins</strong><span>Design de produto</span><small>São Paulo, Brasil</small></div><button aria-label="Mais opções para Ana Martins" className="more">···</button></article>;
  return <div className="status"><span className="status-icon" aria-hidden="true">✓</span><div><strong>Alterações salvas</strong><p>Seu projeto está atualizado e pronto para compartilhar.</p></div></div>;
}

export default function App() {
  const [category, setCategory] = useState<Category>("Todos");
  const [query, setQuery] = useState("");
  const visible = useMemo(() => filterCatalog(componentCatalog, category).filter((entry) =>
    (entry.name + " " + entry.description).toLowerCase().includes(query.toLowerCase())), [category, query]);

  return <main className="page">
    <header className="nav"><a className="brand" href="./"><span>cs</span> component-snapshots</a><span className="github-link">Playground de componentes</span></header>
    <section className="hero"><div><p className="eyebrow">UI PLAYGROUND <span>·</span> SNAPSHOT LAB</p><h1>Um lugar para<br /><em>ver de perto.</em></h1><p>Estados reais de componentes, prontos para explorar em qualquer tela.</p></div><div className="hero-mark" aria-hidden="true"><div className="mark-card one"></div><div className="mark-card two"></div><div className="mark-card three"></div><span>UI<br />/ 04</span></div></section>
    <div className="toolbar"><div className="filters" role="group" aria-label="Filtrar componentes">{categories.map((item) => <button key={item} aria-pressed={category === item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div><label className="search"><span aria-hidden="true">⌕</span><input aria-label="Buscar componentes" placeholder="Buscar componente" value={query} onChange={(event) => setQuery(event.target.value)} /></label></div>
    <section className="grid" aria-label="Componentes">
      {visible.map((entry) => <article className="component-card" data-component={entry.id} key={entry.id}>
        <header><div><span className="category">{entry.category}</span><h2>{entry.name}</h2><p>{entry.description}</p></div><button className="more" aria-label={"Mais opções: " + entry.name}>···</button></header>
        <div className={"preview-area preview-" + entry.id}><Preview entry={entry} /></div>
        <footer><span>{entry.variant}</span><button type="button" aria-label={"Copiar nome de " + entry.name} onClick={() => void navigator.clipboard?.writeText(entry.id)}>Copiar ID <span aria-hidden="true">↗</span></button></footer>
      </article>)}
      {!visible.length && <p className="empty">Nenhum componente corresponde a essa busca.</p>}
    </section>
    <footer className="page-footer"><span>component-snapshots</span><span>Preview e captura em resoluções responsivas.</span></footer>
  </main>;
}

