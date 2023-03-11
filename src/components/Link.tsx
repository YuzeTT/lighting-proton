export default function Link(props:any) {
  return (
    <a href={props.href} target="_blank" class="relative after:absolute after:-left-1 after:-right-1 after:-z-10 after:top-2/3 after:bottom-0 after:bg-orange-200 after:transition-all hover:after:top-0 mx-1" >{props.name}</a>
  )
}
