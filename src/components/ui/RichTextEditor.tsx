import { useCallback, useMemo, useState } from 'react'
import {
  createEditor,
  Editor,
  Element as SlateElement,
  Transforms,
  type Descendant,
  type BaseEditor,
} from 'slate'
import { Slate, Editable, withReact, useSlate, type ReactEditor } from 'slate-react'
import { withHistory, type HistoryEditor } from 'slate-history'

type CustomElement = { type: string; children: CustomText[] }
type CustomText = { text: string; bold?: boolean; italic?: boolean; underline?: boolean; code?: boolean }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: CustomElement
    Text: CustomText
  }
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']

const DEFAULT_VALUE: Descendant[] = [{ type: 'paragraph', children: [{ text: '' }] }]

function isMarkActive(editor: Editor, format: keyof CustomText) {
  const marks = Editor.marks(editor) as Record<string, unknown> | null
  return marks ? marks[format] === true : false
}

function toggleMark(editor: Editor, format: keyof CustomText) {
  if (isMarkActive(editor, format)) Editor.removeMark(editor, format)
  else Editor.addMark(editor, format, true)
}

function isBlockActive(editor: Editor, format: string) {
  const [match] = Array.from(
    Editor.nodes(editor, {
      match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    })
  )
  return Boolean(match)
}

function toggleBlock(editor: Editor, format: string) {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && LIST_TYPES.includes(n.type),
    split: true,
  })

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  })

  if (!isActive && isList) {
    Transforms.wrapNodes(editor, { type: format, children: [] })
  }
}

function MarkButton({ format, icon }: { format: keyof CustomText; icon: string }) {
  const editor = useSlate()
  return (
    <ToolbarBtn
      active={isMarkActive(editor, format)}
      onClick={() => toggleMark(editor, format)}
      label={icon}
    />
  )
}

function BlockButton({ format, icon }: { format: string; icon: string }) {
  const editor = useSlate()
  return (
    <ToolbarBtn active={isBlockActive(editor, format)} onClick={() => toggleBlock(editor, format)} label={icon} />
  )
}

function ToolbarBtn({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault()
        onClick()
      }}
      className={`h-8 min-w-8 rounded-md px-2 text-sm font-medium transition ${
        active ? 'bg-brand-50 text-brand-600 dark:bg-brand-500/15' : 'text-muted hover:bg-gray-100 dark:hover:bg-white/5'
      }`}
    >
      {label}
    </button>
  )
}

function renderElement({ attributes, children, element }: any) {
  switch (element.type) {
    case 'heading-one':
      return <h1 className="mb-2 text-2xl font-bold text-heading" {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 className="mb-2 text-xl font-semibold text-heading" {...attributes}>{children}</h2>
    case 'block-quote':
      return <blockquote className="border-l-4 border-brand-500 pl-3 text-muted italic" {...attributes}>{children}</blockquote>
    case 'numbered-list':
      return <ol className="ml-6 list-decimal" {...attributes}>{children}</ol>
    case 'bulleted-list':
      return <ul className="ml-6 list-disc" {...attributes}>{children}</ul>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    default:
      return <p className="mb-2" {...attributes}>{children}</p>
  }
}

function renderLeaf({ attributes, children, leaf }: any) {
  if (leaf.bold) children = <strong>{children}</strong>
  if (leaf.italic) children = <em>{children}</em>
  if (leaf.underline) children = <u>{children}</u>
  if (leaf.code) children = <code className="rounded bg-gray-100 px-1 dark:bg-white/10">{children}</code>
  return <span {...attributes}>{children}</span>
}

interface Props {
  initialValue?: Descendant[]
  placeholder?: string
  onChange?: (value: Descendant[]) => void
}

export default function RichTextEditor({ initialValue = DEFAULT_VALUE, placeholder, onChange }: Props) {
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  const [value, setValue] = useState<Descendant[]>(initialValue)
  const handleChange = useCallback(
    (v: Descendant[]) => {
      setValue(v)
      onChange?.(v)
    },
    [onChange]
  )

  return (
    <div className="surface-card overflow-hidden rounded-xl border">
      <Slate editor={editor} initialValue={value} onChange={handleChange}>
        <div className="flex flex-wrap items-center gap-1 border-b border-themed p-2">
          <MarkButton format="bold" icon="B" />
          <MarkButton format="italic" icon="I" />
          <MarkButton format="underline" icon="U" />
          <MarkButton format="code" icon="</>" />
          <span className="mx-1 h-5 w-px bg-gray-200 dark:bg-white/10" />
          <BlockButton format="heading-one" icon="H1" />
          <BlockButton format="heading-two" icon="H2" />
          <BlockButton format="block-quote" icon="❝" />
          <span className="mx-1 h-5 w-px bg-gray-200 dark:bg-white/10" />
          <BlockButton format="bulleted-list" icon="•" />
          <BlockButton format="numbered-list" icon="1." />
        </div>
        <Editable
          className="min-h-40 px-4 py-3 text-sm text-body focus:outline-none"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder={placeholder}
          spellCheck
        />
      </Slate>
    </div>
  )
}
