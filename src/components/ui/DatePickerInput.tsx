import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import IconBase from './IconBase'

interface Props {
  selected: Date | null
  onChange: (date: Date | null) => void
  placeholder?: string
  showTime?: boolean
  dateFormat?: string
  label?: string
}

/**
 * react-datepicker wrapped with the template's input styling. Pair `showTime`
 * to turn it into a date-time picker.
 */
export default function DatePickerInput({
  selected,
  onChange,
  placeholder = 'Selecione uma data',
  showTime = false,
  dateFormat = showTime ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy',
  label,
}: Props) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-medium text-heading">{label}</label>}
      <div className="relative">
        <span className="pointer-events-none absolute top-1/2 left-3 z-10 -translate-y-1/2 text-muted">
          <IconBase name="dashboard" size={16} />
        </span>
        <DatePicker
          selected={selected}
          onChange={onChange}
          showTimeSelect={showTime}
          dateFormat={dateFormat}
          placeholderText={placeholder}
          wrapperClassName="w-full"
          className="focus-ring w-full rounded-lg border border-themed bg-transparent py-2.5 pr-3 pl-9 text-sm text-body"
        />
      </div>
    </div>
  )
}
