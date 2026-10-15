export type Category = "Todos" | "Controles" | "Conteúdo" | "Feedback";
export interface ComponentEntry {
  id: string;
  name: string;
  category: Exclude<Category, "Todos">;
  description: string;
  variant: string;
}

export const componentCatalog: ComponentEntry[] = [
  { id: "buttons", name: "Ações", category: "Controles", description: "Botões para ações primárias e secundárias.", variant: "botões" },
  { id: "search-field", name: "Campo de busca", category: "Controles", description: "Campo com label e ajuda visível.", variant: "formulário" },
  { id: "profile-card", name: "Cartão de perfil", category: "Conteúdo", description: "Resumo de uma pessoa com ação contextual.", variant: "cartão" },
  { id: "status-message", name: "Mensagem de status", category: "Feedback", description: "Retorno de sucesso com texto claro.", variant: "alerta" },
];

export function filterCatalog(entries: ComponentEntry[], category: Category): ComponentEntry[] {
  return category === "Todos" ? entries : entries.filter((entry) => entry.category === category);
}

