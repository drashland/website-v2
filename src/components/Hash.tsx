export default function Hash(props) {
  return (
    <a href={`#${props.hash}`}>{props.displayName}</a>
  )
}