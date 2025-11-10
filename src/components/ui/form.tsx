import { Controller, type ControllerProps, type FieldPath, type FieldValues } from 'react-hook-form'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { Input } from './input'
import { Textarea } from './textarea'
import { Select, SelectContent, SelectTrigger, SelectValue } from './select'
import { Checkbox } from './checkbox'
import { Label, Description } from './field'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

type FormControlProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = {
  name: TName
  label: ReactNode
  description?: ReactNode
  control: ControllerProps<TFieldValues, TName, TTransformedValues>['control']
  required?: boolean
}

type FormBaseProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = FormControlProps<TFieldValues, TName, TTransformedValues> & {
  horizontal?: boolean
  controlFirst?: boolean
  children: (
    field: Parameters<
      ControllerProps<TFieldValues, TName, TTransformedValues>['render']
    >[0]['field'] & {
      'aria-invalid': boolean
      id: string
    },
  ) => ReactNode
}

type FormControlFunc<ExtraProps extends Record<string, unknown> = Record<never, never>> = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(
  props: FormControlProps<TFieldValues, TName, TTransformedValues> & ExtraProps,
) => ReactNode

function FormBase<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  children,
  control,
  label,
  name,
  description,
  controlFirst,
  horizontal,
  required,
}: FormBaseProps<TFieldValues, TName, TTransformedValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const labelElement = (
          <>
            <Label htmlFor={field.name}>
              {label}
              {required && <span className="text-danger ml-1">*</span>}
            </Label>
            {description && <Description>{description}</Description>}
          </>
        )
        const controlElement = children({
          ...field,
          id: field.name,
          'aria-invalid': fieldState.invalid,
        })
        const errorElem = fieldState.invalid && fieldState.error && (
          <article className="text-danger mt-2 flex items-center gap-1 leading-6 font-normal">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-circle-alert-icon lucide-circle-alert"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
            <p>{fieldState.error.message || 'This field is required'}</p>
          </article>
        )

        return (
          <div
            className={horizontal ? 'flex items-start' : 'space-y-2'}
            data-invalid={fieldState.invalid}
          >
            {controlFirst ? (
              <>
                {controlElement}
                {errorElem && <div className="mt-1">{errorElem}</div>}
              </>
            ) : (
              <>
                <div className="space-y-1">{labelElement}</div>
                {controlElement}
                {errorElem}
              </>
            )}
          </div>
        )
      }}
    />
  )
}

export const FormInput: FormControlFunc<{ type?: string; placeholder?: string }> = (props) => {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = props.type === 'password'
  const inputType = isPassword && showPassword ? 'text' : props.type

  return (
    <FormBase {...props}>
      {(field) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { ref, ...fieldProps } = field
        return (
          <div className="relative">
            <Input
              autoComplete="off"
              className={`focus:ring-primary min-h-[52px] outline-none focus:ring-0 focus:ring-offset-0 ${isPassword ? 'pr-10' : ''}`}
              {...fieldProps}
              type={inputType}
              placeholder={props.placeholder}
            />
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            )}
          </div>
        )
      }}
    </FormBase>
  )
}

export const FormTextarea: FormControlFunc = (props) => {
  return (
    <FormBase {...props}>
      {(field) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { ref, ...fieldProps } = field
        return <Textarea {...fieldProps} />
      }}
    </FormBase>
  )
}

export const FormSelect: FormControlFunc<{ children: ReactNode }> = ({ children, ...props }) => {
  return (
    <FormBase {...props}>
      {({ onChange, value, onBlur, name, id }) => (
        <Select value={value} onValueChange={onChange} name={name}>
          <SelectTrigger id={id} onBlur={onBlur}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>{children}</SelectContent>
        </Select>
      )}
    </FormBase>
  )
}

export const FormCheckbox: FormControlFunc = (props) => {
  return (
    <FormBase {...props} horizontal controlFirst>
      {({ onChange, value, id, ...field }) => (
        <div className="flex items-center gap-2">
          <Checkbox id={id} {...field} checked={value} onCheckedChange={onChange} />
          <Label htmlFor={id}>{props.label}</Label>
        </div>
      )}
    </FormBase>
  )
}
